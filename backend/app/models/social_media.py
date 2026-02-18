from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base


class SocialMediaLink(Base):
    """SocialMediaLink model for social media links"""
    
    __tablename__ = "social_media_links"
    
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String(50), nullable=False)  # "instagram", "facebook"
    url = Column(String(500), nullable=False)  # Full URL
    icon = Column(String(100), nullable=True)  # Optional icon name
    order_index = Column(Integer, default=0, index=True)  # Display order
    is_active = Column(Boolean, default=True, index=True)  # Show/hide
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<SocialMediaLink {self.id}: {self.platform}>"