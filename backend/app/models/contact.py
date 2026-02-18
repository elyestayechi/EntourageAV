from sqlalchemy import Column, Integer, String, Text, Boolean, JSON, DateTime
from sqlalchemy.sql import func
from app.database import Base


class ContactSubmission(Base):
    """ContactSubmission model for contact form submissions"""
    
    __tablename__ = "contact_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    services = Column(JSON, nullable=False)  # ["renovations-interieures", "electricite"]
    location = Column(String(255), nullable=False)
    project_type = Column(String(100), nullable=True)  # "appartement", "maison"
    surface = Column(String(100), nullable=True)  # "85m²"
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    
    def __repr__(self):
        return f"<ContactSubmission {self.id}: {self.name}>"