from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class CategoryCreate(BaseModel):
    name: str = Field(..., max_length=100)


class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    type: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True