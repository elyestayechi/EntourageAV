import logging
from fastapi import FastAPI, Request
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy import text, inspect
from app.core.config import settings
from app.api.v1.router import api_router
from app.database import engine, Base

# ── Logging setup ──────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("entourage.cors")

# Create database tables
Base.metadata.create_all(bind=engine)


def run_safe_migrations():
    """
    Safely add any missing columns to existing tables.
    Uses inspect() to check before altering — safe to run on every startup.
    """
    with engine.connect() as conn:
        inspector = inspect(engine)

        # ── projects.image ─────────────────────────────────────────────────
        project_cols = [c["name"] for c in inspector.get_columns("projects")]
        if "image" not in project_cols:
            conn.execute(text("ALTER TABLE projects ADD COLUMN image VARCHAR(500)"))
            conn.commit()
            print("✅ Migration: added 'image' column to projects table")

run_safe_migrations()


def configure_s3_cors():
    """
    Configure CORS on the Railway S3 bucket at startup.
    This allows the Vercel frontend to load images directly from S3.
    Safe to run on every startup — put_bucket_cors is idempotent.
    """
    if not settings.use_s3:
        print("ℹ️  S3 not configured — skipping CORS setup")
        return

    try:
        import boto3
        from botocore.client import Config

        s3 = boto3.client(
            "s3",
            endpoint_url=settings.S3_ENDPOINT,
            aws_access_key_id=settings.S3_ACCESS_KEY,
            aws_secret_access_key=settings.S3_SECRET_KEY,
            region_name=settings.S3_REGION,
            config=Config(signature_version="s3v4"),
        )

        # Build allowed origins — filter out empty strings
        allowed_origins = [
            o for o in [
                settings.VERCEL_URL,
                settings.FRONTEND_URL,
                settings.CUSTOM_DOMAIN,
                "http://localhost:3000",
                "http://localhost:5173",
            ]
            if o and o.strip()
        ]

        s3.put_bucket_cors(
            Bucket=settings.S3_BUCKET,
            CORSConfiguration={
                "CORSRules": [
                    {
                        "AllowedHeaders": ["*"],
                        "AllowedMethods": ["GET", "HEAD"],
                        "AllowedOrigins": allowed_origins,
                        "ExposeHeaders": ["ETag", "Content-Length", "Content-Type"],
                        "MaxAgeSeconds": 86400,
                    }
                ]
            },
        )
        print(f"✅ S3 CORS configured for origins: {allowed_origins}")

    except ImportError:
        print("⚠️  boto3 not installed — S3 CORS not configured")
    except Exception as e:
        # Log but don't crash the server — CORS config failure shouldn't block startup
        print(f"⚠️  S3 CORS configuration failed: {e}")
        logger.warning(f"S3 CORS configuration failed: {e}")

configure_s3_cors()


# ── CORS origins ───────────────────────────────────────────────────────────────
allowed_origins = [o.strip() for o in [
    "http://localhost:3000",        # local frontend dev
    "http://localhost:5173",        # Vite default port
    settings.FRONTEND_URL,         # primary origin (set in .env)
    settings.VERCEL_URL,           # Vercel deployment URL
    settings.CUSTOM_DOMAIN,        # future production domain
] if o and o.strip()]

# Deduplicate while preserving order
seen: set = set()
cors_origins: list = []
for origin in allowed_origins:
    if origin not in seen:
        seen.add(origin)
        cors_origins.append(origin)

print(f"✅ CORS allowed origins: {cors_origins}")
logger.info(f"✅ CORS allowed origins: {cors_origins}")


# ── Custom CORS middleware ─────────────────────────────────────────────────────
# We use a custom middleware instead of FastAPI's built-in CORSMiddleware
# because Railway's proxy layer can override the 'Access-Control-Allow-Origin'
# header to '*', which breaks withCredentials requests from the browser.
class CustomCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        origin = request.headers.get("origin", "")
        method = request.method
        path = request.url.path

        logger.debug(f"[CORS] {method} {path} | Origin: '{origin}'")
        logger.debug(f"[CORS] Allowed origins: {cors_origins}")
        logger.debug(f"[CORS] Origin match: {origin in cors_origins}")

        # Handle CORS preflight requests
        if method == "OPTIONS":
            response = Response()
            if origin in cors_origins:
                logger.debug(f"[CORS] ✅ Preflight ALLOWED for origin: {origin}")
                response.headers["Access-Control-Allow-Origin"] = origin
                response.headers["Access-Control-Allow-Credentials"] = "true"
                response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
                response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Cookie"
                response.headers["Access-Control-Max-Age"] = "600"
            else:
                logger.warning(f"[CORS] ❌ Preflight BLOCKED for origin: '{origin}' — not in allowed list")
            return response

        # Handle all other requests
        response = await call_next(request)

        if origin in cors_origins:
            logger.debug(f"[CORS] ✅ Response headers set for origin: {origin}")
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Cookie"
        else:
            if origin:
                logger.warning(f"[CORS] ❌ Response BLOCKED for origin: '{origin}' — not in allowed list")
            # Log what header Railway/proxy may have injected
            existing = response.headers.get("Access-Control-Allow-Origin", "NOT SET")
            logger.debug(f"[CORS] Existing Access-Control-Allow-Origin header: '{existing}'")

        return response


# Initialize FastAPI app
app = FastAPI(
    title="Entourage AV API",
    description="Backend API for Entourage AV renovation company website",
    version="1.0.0",
    debug=settings.DEBUG,
    redirect_slashes=False,
)

# ⚠️ Middleware order matters — added in reverse execution order.
# CustomCORSMiddleware runs first (outermost), SessionMiddleware runs second.

app.add_middleware(CustomCORSMiddleware)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY,
    max_age=settings.SESSION_MAX_AGE,
    # "none" is required for cross-origin cookie sending (Vercel → Railway).
    # "strict" would silently block the session cookie on every request after login.
    # "none" requires https_only=True — both must be set together in production.
    same_site="none" if settings.is_production else "lax",
    https_only=settings.is_production,
)

# Mount static files directory
app.mount("/static", StaticFiles(directory=settings.UPLOAD_DIR), name="static")

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "message": "Welcome to Entourage AV API",
        "status": "online",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT,
        "docs": "/docs",
        "cors_origins": cors_origins,
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "environment": settings.ENVIRONMENT,
    }