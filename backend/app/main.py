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

        # ── projects.image ─────────────────────────────────────────────────
        project_cols = [c["name"] for c in inspector.get_columns("projects")]
        if "image" not in project_cols:
            conn.execute(text("ALTER TABLE projects ADD COLUMN image VARCHAR(500)"))
            conn.commit()
            print("✅ Migration: added 'image' column to projects table")

run_safe_migrations()


# ── CORS origins ───────────────────────────────────────────────────────────────
# Build list from all configured origins — filters out empty strings so
# missing optional env vars don't create blank entries.
allowed_origins = [o.strip() for o in [
    "http://localhost:3000",        # local frontend dev
    "http://localhost:5173",        # Vite default port
    settings.FRONTEND_URL,         # primary origin (set in .env)
    settings.VERCEL_URL,           # Vercel deployment URL
    settings.CUSTOM_DOMAIN,        # future production domain
] if o and o.strip()]

# Deduplicate while preserving order
seen: set = set()
cors_origins = []
for origin in allowed_origins:
    if origin not in seen:
        seen.add(origin)
        cors_origins.append(origin)

print(f"✅ CORS allowed origins: {cors_origins}")


# Initialize FastAPI app
app = FastAPI(
    title="Entourage AV API",
    description="Backend API for Entourage AV renovation company website",
    version="1.0.0",
    debug=settings.DEBUG,
    redirect_slashes=False,
)

# ⚠️ CORS must be added FIRST (runs last due to reverse middleware order)
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Session middleware added AFTER CORS
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
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "environment": settings.ENVIRONMENT,
    }