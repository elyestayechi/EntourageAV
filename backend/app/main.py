from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy import text, inspect
from app.core.config import settings
from app.api.v1.router import api_router
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)


def run_safe_migrations():
    """
    Safely add any missing columns to existing tables.
    Uses inspect() to check before altering — safe to run on every startup.
    """
    with engine.connect() as conn:
        inspector = inspect(engine)

        # ── projects.image ────────────────────────────────────────────────────
        project_cols = [c["name"] for c in inspector.get_columns("projects")]
        if "image" not in project_cols:
            conn.execute(text("ALTER TABLE projects ADD COLUMN image VARCHAR(500)"))
            conn.commit()
            print("✅ Migration: added 'image' column to projects table")

run_safe_migrations()


# Initialize FastAPI app
app = FastAPI(
    title="Entourage AV API",
    description="Backend API for Entourage AV renovation company website",
    version="1.0.0",
    debug=settings.DEBUG,
    redirect_slashes=False,
)

# ⚠️ CORS must be added FIRST (it runs last due to reverse execution order)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],  # e.g. "http://localhost:3000"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Session middleware added AFTER CORS
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY,
    max_age=settings.SESSION_MAX_AGE,
    same_site="lax" if not settings.is_production else "strict",
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
        # Add this temporarily to confirm env is loading correctly:
        "frontend_url": settings.FRONTEND_URL,
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "environment": settings.ENVIRONMENT,
    }