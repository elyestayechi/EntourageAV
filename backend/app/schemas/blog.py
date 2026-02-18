from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, date


class BlogBase(BaseModel):
    """Base blog post schema"""
    slug: str = Field(..., max_length=255)
    title: str = Field(..., max_length=255)
    category: str = Field(..., max_length=100)
    date: date
    excerpt: str
    content: Optional[str] = None
    image: Optional[str] = Field(None, max_length=500)
    author: Optional[str] = Field(None, max_length=255)
    read_time: Optional[str] = Field(None, max_length=50)


class BlogCreate(BlogBase):
    """Schema for creating a blog post"""
    pass


class BlogUpdate(BaseModel):
    """Schema for updating a blog post (all fields optional)"""
    slug: Optional[str] = Field(None, max_length=255)
    title: Optional[str] = Field(None, max_length=255)
    category: Optional[str] = Field(None, max_length=100)
    date: Optional[date] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = Field(None, max_length=500)
    author: Optional[str] = Field(None, max_length=255)
    read_time: Optional[str] = Field(None, max_length=50)


class BlogResponse(BlogBase):
    """Schema for blog post response"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True