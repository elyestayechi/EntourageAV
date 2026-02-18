from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.api.deps import require_admin
from app.utils.files import save_upload_file, delete_file, optimize_image

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/", dependencies=[Depends(require_admin)])
async def upload_file(
    file: UploadFile = File(...),
    subfolder: str = ""
):
    """
    Upload a file to the server.
    Admin only endpoint.
    
    Args:
        file: File to upload
        subfolder: Subdirectory (e.g., "services", "projects", "blog")
        
    Returns:
        File path and URL
        
    Raises:
        HTTPException: If upload fails
    """
    try:
        # Save file
        file_path = await save_upload_file(file, subfolder)
        
        # Optimize if it's an image
        if file.content_type and file.content_type.startswith("image/"):
            await optimize_image(file_path)
        
        return {
            "message": "File uploaded successfully",
            "file_path": file_path,
            "url": f"/static/{file_path}"
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@router.delete("/{file_path:path}", dependencies=[Depends(require_admin)])
async def delete_uploaded_file(file_path: str):
    """
    Delete an uploaded file.
    Admin only endpoint.
    
    Args:
        file_path: Relative path to file
        
    Returns:
        Success message
        
    Raises:
        HTTPException: If file not found
    """
    success = delete_file(file_path)
    
    if not success:
        raise HTTPException(status_code=404, detail="File not found")
    
    return {"message": "File deleted successfully"}