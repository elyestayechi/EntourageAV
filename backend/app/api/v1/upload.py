import io
import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Request
from fastapi.responses import JSONResponse, StreamingResponse
from app.core.config import settings
from app.core.security import check_admin_session


def require_admin(request: Request) -> None:
    """Dependency that raises 401 if the request has no valid admin session."""
    if not check_admin_session(request):
        raise HTTPException(status_code=401, detail="Admin authentication required")


router = APIRouter()

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp"}


def _safe_filename(original: str) -> str:
    ext = original.rsplit(".", 1)[-1].lower() if "." in original else "jpg"
    return f"{uuid.uuid4().hex}.{ext}"


def _get_content_type(filename: str) -> str:
    ext = filename.rsplit(".", 1)[-1].lower()
    return {
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "png": "image/png",
        "webp": "image/webp",
    }.get(ext, "image/jpeg")


def _get_s3_client():
    """Create and return a boto3 S3 client."""
    try:
        import boto3
        from botocore.client import Config

        return boto3.client(
            "s3",
            endpoint_url=settings.S3_ENDPOINT,
            aws_access_key_id=settings.S3_ACCESS_KEY,
            aws_secret_access_key=settings.S3_SECRET_KEY,
            region_name=settings.S3_REGION,
            config=Config(signature_version="s3v4"),
        )
    except ImportError:
        raise HTTPException(
            status_code=500,
            detail="boto3 not installed. Add 'boto3' to requirements.txt"
        )


# ── Railway S3 upload ──────────────────────────────────────────────────────────
def _upload_to_s3(file_bytes: bytes, filename: str, subfolder: str) -> dict:
    try:
        s3 = _get_s3_client()
        key = f"{subfolder}/{filename}" if subfolder else filename

        s3.put_object(
            Bucket=settings.S3_BUCKET,
            Key=key,
            Body=file_bytes,
            ContentType=_get_content_type(filename),
        )

        # Return a proxied URL through our own backend instead of direct S3 URL.
        # This avoids the Tigris/Railway S3 public access problem entirely —
        # images are served through FastAPI which already has correct CORS headers.
        proxy_url = f"{settings.BACKEND_URL}/api/v1/upload/media/{key}"

        return {
            "message": "File uploaded to Railway S3",
            "file_path": key,
            "url": proxy_url,
            "full_url": proxy_url,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"S3 upload failed: {str(e)}")


# ── Local upload (development) ─────────────────────────────────────────────────
def _upload_to_local(file_bytes: bytes, filename: str, subfolder: str) -> dict:
    upload_dir = os.path.join(settings.UPLOAD_DIR, subfolder) if subfolder else settings.UPLOAD_DIR
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, filename)
    with open(file_path, "wb") as f:
        f.write(file_bytes)

    relative_url = f"/static/{subfolder}/{filename}" if subfolder else f"/static/{filename}"

    return {
        "message": "File uploaded locally",
        "file_path": file_path,
        "url": relative_url,
        "full_url": f"http://localhost:8000{relative_url}",
    }


# ── Delete from S3 ─────────────────────────────────────────────────────────────
def _delete_from_s3(key: str) -> None:
    try:
        s3 = _get_s3_client()
        s3.delete_object(Bucket=settings.S3_BUCKET, Key=key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"S3 delete failed: {str(e)}")


# ── Routes ─────────────────────────────────────────────────────────────────────

@router.get("/media/{file_path:path}")
async def serve_media(file_path: str):
    """
    Proxy S3 images through the backend.
    Since Tigris/Railway S3 doesn't support public bucket policies,
    we fetch the object privately and stream it to the client.
    The backend already has correct CORS headers so the browser accepts it.
    """
    if not settings.use_s3:
        raise HTTPException(status_code=404, detail="S3 not configured")

    try:
        s3 = _get_s3_client()
        obj = s3.get_object(Bucket=settings.S3_BUCKET, Key=file_path)
        content_type = obj.get("ContentType", "image/jpeg")
        body = obj["Body"].read()

        return StreamingResponse(
            io.BytesIO(body),
            media_type=content_type,
            headers={
                # Cache aggressively on the client — images don't change
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"File not found: {str(e)}")


@router.post("/")
async def upload_file(
    request: Request,
    file: UploadFile = File(...),
    subfolder: str = "",
    _=Depends(require_admin),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"File type '{file.content_type}' not allowed. Use JPEG, PNG or WebP."
        )

    file_bytes = await file.read()

    if len(file_bytes) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Max size is {settings.MAX_FILE_SIZE // (1024 * 1024)}MB."
        )

    filename = _safe_filename(file.filename or "upload")

    if settings.use_s3:
        result = _upload_to_s3(file_bytes, filename, subfolder)
    else:
        result = _upload_to_local(file_bytes, filename, subfolder)

    return JSONResponse(content=result)


@router.delete("/{file_path:path}")
async def delete_file(request: Request, file_path: str, _=Depends(require_admin)):
    if settings.use_s3:
        _delete_from_s3(file_path)
        return {"message": "File deleted from S3"}

    full_path = os.path.join(settings.UPLOAD_DIR, file_path)
    if os.path.exists(full_path):
        os.remove(full_path)
        return {"message": "File deleted"}

    raise HTTPException(status_code=404, detail="File not found")