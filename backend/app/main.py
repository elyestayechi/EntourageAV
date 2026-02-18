from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Entourage AV API",
    description="Backend API for Entourage AV renovation company website",
    version="1.0.0",
    debug=settings.DEBUG,
)

# Add session middleware for authentication
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY,
    max_age=settings.SESSION_MAX_AGE,
    same_site="lax",
    https_only=False,  # Set to True in production with HTTPS
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],  # Frontend URL
    allow_credentials=True,  # Required for session cookies
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Mount static files directory
app.mount("/static", StaticFiles(directory=settings.UPLOAD_DIR), name="static")

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    """
    Root endpoint - API health check.
    
    Returns:
        Welcome message and API status
    """
    return {
        "message": "Welcome to Entourage AV API",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """
    Health check endpoint.
    
    Returns:
        Service health status
    """
    return {
        "status": "healthy",
        "database": "connected"
    }