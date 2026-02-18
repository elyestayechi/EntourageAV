from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class ServiceBase(BaseModel):
    """Base service schema"""
    number: str = Field(..., max_length=10)
    slug: str = Field(..., max_length=255)
    title: str = Field(..., max_length=255)
    description: str
    long_description: Optional[str] = None
    image: Optional[str] = Field(None, max_length=500)
    timeline: Optional[str] = Field(None, max_length=100)
    benefits: Optional[List[str]] = None


class ServiceCreate(ServiceBase):
    """Schema for creating a service"""
    pass


class ServiceUpdate(BaseModel):
    """Schema for updating a service (all fields optional)"""
    number: Optional[str] = Field(None, max_length=10)
    slug: Optional[str] = Field(None, max_length=255)
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    long_description: Optional[str] = None
    image: Optional[str] = Field(None, max_length=500)
    timeline: Optional[str] = Field(None, max_length=100)
    benefits: Optional[List[str]] = None


class ServiceResponse(ServiceBase):
    """Schema for service response"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True