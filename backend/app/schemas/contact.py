from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class ContactBase(BaseModel):
    """Base contact submission schema"""
    name: str = Field(..., max_length=255)
    email: EmailStr
    phone: str = Field(..., max_length=50)
    services: List[str]  # ["renovations-interieures", "electricite"]
    location: str = Field(..., max_length=255)
    project_type: Optional[str] = Field(None, max_length=100)
    surface: Optional[str] = Field(None, max_length=100)
    message: str


class ContactCreate(ContactBase):
    """Schema for creating a contact submission"""
    pass


class ContactResponse(ContactBase):
    """Schema for contact submission response"""
    id: int
    is_read: bool
    created_at: datetime
    
    class Config:
        from_attributes = True