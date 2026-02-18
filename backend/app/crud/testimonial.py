from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate


class CRUDTestimonial(CRUDBase[Testimonial, TestimonialCreate, TestimonialUpdate]):
    """CRUD operations for Testimonial model"""
    
    def get_active(self, db: Session) -> List[Testimonial]:
        """Get all active testimonials ordered by order_index"""
        return db.query(Testimonial).filter(
            Testimonial.is_active == True
        ).order_by(Testimonial.order_index).all()
    
    def get_all_ordered(self, db: Session) -> List[Testimonial]:
        """Get all testimonials ordered by order_index"""
        return db.query(Testimonial).order_by(Testimonial.order_index).all()
    
    def toggle_active(self, db: Session, testimonial_id: int) -> Optional[Testimonial]:
        """Toggle testimonial active status"""
        db_testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
        if db_testimonial:
            db_testimonial.is_active = not db_testimonial.is_active
            db.commit()
            db.refresh(db_testimonial)
        return db_testimonial
    
    def reorder(self, db: Session, testimonial_id: int, new_order: int) -> Optional[Testimonial]:
        """Update testimonial order_index"""
        db_testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
        if db_testimonial:
            db_testimonial.order_index = new_order
            db.commit()
            db.refresh(db_testimonial)
        return db_testimonial


# Create instance
testimonial = CRUDTestimonial(Testimonial)