from pydantic import BaseModel, Field, HttpUrl
from typing import Optional
from datetime import datetime


class SocialMediaBase(BaseModel):
    """Base social media link schema"""
    platform: str = Field(..., max_length=50)
    url: str = Field(..., max_length=500)
    icon: Optional[str] = Field(None, max_length=100)
    order_index: int = Field(default=0)
    is_active: bool = Field(default=True)


class SocialMediaCreate(SocialMediaBase):
    """Schema for creating a social media link"""
    pass


class SocialMediaUpdate(BaseModel):
    """Schema for updating a social media link (all fields optional)"""
    platform: Optional[str] = Field(None, max_length=50)
    url: Optional[str] = Field(None, max_length=500)
    icon: Optional[str] = Field(None, max_length=100)
    order_index: Optional[int] = None
    is_active: Optional[bool] = None


class SocialMediaResponse(SocialMediaBase):
    """Schema for social media link response"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True