from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    ProjectImageCreate,
    ProjectImageResponse,
)
from app.schemas.blog import BlogCreate, BlogUpdate, BlogResponse
from app.schemas.contact import ContactCreate, ContactResponse
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate, TestimonialResponse
from app.schemas.social_media import SocialMediaCreate, SocialMediaUpdate, SocialMediaResponse
from app.schemas.auth import LoginRequest, LoginResponse, CheckAuthResponse

__all__ = [
    # Service
    "ServiceCreate",
    "ServiceUpdate",
    "ServiceResponse",
    # Project
    "ProjectCreate",
    "ProjectUpdate",
    "ProjectResponse",
    "ProjectImageCreate",
    "ProjectImageResponse",
    # Blog
    "BlogCreate",
    "BlogUpdate",
    "BlogResponse",
    # Contact
    "ContactCreate",
    "ContactResponse",
    # Testimonial
    "TestimonialCreate",
    "TestimonialUpdate",
    "TestimonialResponse",
    # Social Media
    "SocialMediaCreate",
    "SocialMediaUpdate",
    "SocialMediaResponse",
    # Auth
    "LoginRequest",
    "LoginResponse",
    "CheckAuthResponse",
]