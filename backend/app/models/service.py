from sqlalchemy import Column, Integer, String, Text, JSON, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Service(Base):
    """Service model for renovation services"""
    
    __tablename__ = "services"
    
    id = Column(Integer, primary_key=True, index=True)
    number = Column(String(10), nullable=False)  # "01", "02"
    slug = Column(String(255), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    long_description = Column(Text, nullable=True)
    image = Column(String(500), nullable=True)
    timeline = Column(String(100), nullable=True)  # "2-6 semaines"
    benefits = Column(JSON, nullable=True)  # Array of benefits
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<Service {self.number}: {self.title}>"