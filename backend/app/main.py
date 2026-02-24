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


# ── CORS origins ───────────────────────────────────────────────────────────────
allowed_origins = [o.strip() for o in [
    "http://localhost:3000",
    "http://localhost:5173",
    settings.FRONTEND_URL,
    settings.VERCEL_URL,
    settings.CUSTOM_DOMAIN,
] if o and o.strip()]

# Deduplicate while preserving order
seen: set = set()
cors_origins: list = []
for origin in allowed_origins:
    if origin not in seen:
        seen.add(origin)
        cors_origins.append(origin)

print(f"✅ CORS allowed origins: {cors_origins}")
print(f"✅ Backend URL (for image proxying): {settings.BACKEND_URL}")
logger.info(f"✅ CORS allowed origins: {cors_origins}")


# ── Custom CORS middleware ─────────────────────────────────────────────────────
class CustomCORSMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        origin = request.headers.get("origin", "")
        method = request.method
        path = request.url.path

        logger.debug(f"[CORS] {method} {path} | Origin: '{origin}'")

        # Handle CORS preflight requests
        if method == "OPTIONS":
            response = Response()
            if origin in cors_origins:
                response.headers["Access-Control-Allow-Origin"] = origin
                response.headers["Access-Control-Allow-Credentials"] = "true"
                response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
                response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Cookie"
                response.headers["Access-Control-Max-Age"] = "600"
            return response

        response = await call_next(request)

        if origin in cors_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Access-Control-Allow-Credentials"] = "true"
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, Cookie"

        return response


# Initialize FastAPI app
app = FastAPI(
    title="Entourage AV API",
    description="Backend API for Entourage AV renovation company website",
    version="1.0.0",
    debug=settings.DEBUG,
    redirect_slashes=False,
)

app.add_middleware(CustomCORSMiddleware)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY,
    max_age=settings.SESSION_MAX_AGE,
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
        "backend_url": settings.BACKEND_URL,
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "environment": settings.ENVIRONMENT,
    }