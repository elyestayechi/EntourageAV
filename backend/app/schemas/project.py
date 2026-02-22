from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ProjectImageBase(BaseModel):
    """Base project image schema"""
    before_image: str = Field(..., max_length=500)
    after_image: str = Field(..., max_length=500)
    label: Optional[str] = Field(None, max_length=255)
    order_index: int = Field(default=0)


class ProjectImageCreate(ProjectImageBase):
    """Schema for creating a project image pair"""
    pass


class ProjectImageResponse(ProjectImageBase):
    """Schema for project image response"""
    id: int
    project_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    """Base project schema"""
    slug: str = Field(..., max_length=255)
    number: str = Field(..., max_length=10)
    title: str = Field(..., max_length=255)
    category: str = Field(..., max_length=100)
    location: str = Field(..., max_length=255)
    description: str
    duration: Optional[str] = Field(None, max_length=100)
    surface: Optional[str] = Field(None, max_length=100)
    image: Optional[str] = Field(None, max_length=500)  # ✅ Cover image URL
    is_featured: Optional[bool] = Field(default=False)  # ✅ New field


class ProjectCreate(ProjectBase):
    """Schema for creating a project"""
    pass


class ProjectUpdate(BaseModel):
    """Schema for updating a project (all fields optional)"""
    slug: Optional[str] = Field(None, max_length=255)
    number: Optional[str] = Field(None, max_length=10)
    title: Optional[str] = Field(None, max_length=255)
    category: Optional[str] = Field(None, max_length=100)
    location: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    duration: Optional[str] = Field(None, max_length=100)
    surface: Optional[str] = Field(None, max_length=100)
    image: Optional[str] = Field(None, max_length=500)
    is_featured: Optional[bool] = None  # ✅ New field


class ProjectResponse(ProjectBase):
    """Schema for project response"""
    id: int
    images: List[ProjectImageResponse] = []
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True