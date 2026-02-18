from typing import Optional
from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    """Schema for admin login request"""
    username: str = Field(..., min_length=1)
    password: str = Field(..., min_length=1)


class LoginResponse(BaseModel):
    """Schema for login response"""
    message: str
    is_admin: bool


class CheckAuthResponse(BaseModel):
    """Schema for auth check response"""
    is_authenticated: bool
    username: Optional[str] = None
    
    class Config:
        from_attributes = True