from fastapi import APIRouter
from app.api.v1 import (
    auth,
    services,
    projects,
    blog,
    contacts,
    testimonials,
    social_media,
    upload,
)

# Create main API router
api_router = APIRouter()

# Include all routers
api_router.include_router(auth.router)
api_router.include_router(services.router)
api_router.include_router(projects.router)
api_router.include_router(blog.router)
api_router.include_router(contacts.router)
api_router.include_router(testimonials.router)
api_router.include_router(social_media.router)
api_router.include_router(upload.router)