from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TestimonialBase(BaseModel):
    """Base testimonial schema"""
    name: str = Field(..., max_length=255)
    location: str = Field(..., max_length=255)
    text: str
    rating: int = Field(default=5, ge=1, le=5)
    project: Optional[str] = Field(None, max_length=255)
    order_index: int = Field(default=0)
    is_active: bool = Field(default=True)


class TestimonialCreate(TestimonialBase):
    """Schema for creating a testimonial"""
    pass


class TestimonialUpdate(BaseModel):
    """Schema for updating a testimonial (all fields optional)"""
    name: Optional[str] = Field(None, max_length=255)
    location: Optional[str] = Field(None, max_length=255)
    text: Optional[str] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    project: Optional[str] = Field(None, max_length=255)
    order_index: Optional[int] = None
    is_active: Optional[bool] = None


class TestimonialResponse(TestimonialBase):
    """Schema for testimonial response"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True