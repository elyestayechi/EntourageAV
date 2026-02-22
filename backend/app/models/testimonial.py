from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from app.database import Base


class Testimonial(Base):
    """Testimonial model for client testimonials"""
    
    __tablename__ = "testimonials"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)  # "Marie & Jean Dubois"
    location = Column(String(255), nullable=False)  # "Paris 16ème"
    text = Column(Text, nullable=False)  # Testimonial content
    rating = Column(Integer, default=5)  # 1-5 stars
    project = Column(String(255), nullable=True)  # "Rénovation Complète"
    order_index = Column(Integer, default=0, index=True)  # Display order
    is_active = Column(Boolean, default=True, index=True)  # Show/hide
    is_featured = Column(Boolean, default=False)  # ✅ New field for featured testimonials
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<Testimonial {self.id}: {self.name}>"