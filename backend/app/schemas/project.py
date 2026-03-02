from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ProjectImageBase(BaseModel):
    before_image: str = Field(..., max_length=500)
    after_image: str = Field(..., max_length=500)
    label: Optional[str] = Field(None, max_length=255)
    order_index: int = Field(default=0)


class ProjectImageCreate(ProjectImageBase):
    pass


class ProjectImageResponse(ProjectImageBase):
    id: int
    project_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    slug: str = Field(..., max_length=255)
    number: str = Field(..., max_length=10)
    title: str = Field(..., max_length=255)
    category: str = Field(..., max_length=100)
    location: str = Field(..., max_length=255)
    description: str
    duration: Optional[str] = Field(None, max_length=100)
    surface: Optional[str] = Field(None, max_length=100)
    image: Optional[str] = Field(None, max_length=500)          # cover / hero image
    thumbnail_image: Optional[str] = Field(None, max_length=500)  # gallery card thumbnail
    is_featured: Optional[bool] = Field(default=False)


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    slug: Optional[str] = Field(None, max_length=255)
    number: Optional[str] = Field(None, max_length=10)
    title: Optional[str] = Field(None, max_length=255)
    category: Optional[str] = Field(None, max_length=100)
    location: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    duration: Optional[str] = Field(None, max_length=100)
    surface: Optional[str] = Field(None, max_length=100)
    image: Optional[str] = Field(None, max_length=500)
    thumbnail_image: Optional[str] = Field(None, max_length=500)
    is_featured: Optional[bool] = None


class ProjectResponse(ProjectBase):
    id: int
    images: List[ProjectImageResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True