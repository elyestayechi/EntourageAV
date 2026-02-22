from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate


class CRUDTestimonial(CRUDBase[Testimonial, TestimonialCreate, TestimonialUpdate]):
    def get_active(self, db: Session) -> List[Testimonial]:
        """Get all active testimonials"""
        return db.query(Testimonial)\
            .filter(Testimonial.is_active == True)\
            .order_by(Testimonial.order_index)\
            .all()

    def get_all_ordered(self, db: Session) -> List[Testimonial]:
        """Get all testimonials ordered by order_index"""
        return db.query(Testimonial)\
            .order_by(Testimonial.order_index)\
            .all()

    def get_featured(self, db: Session, *, limit: int = 3) -> List[Testimonial]:
        """Get featured testimonials (active and featured)"""
        return db.query(Testimonial)\
            .filter(Testimonial.is_active == True)\
            .filter(Testimonial.is_featured == True)\
            .order_by(Testimonial.order_index)\
            .limit(limit)\
            .all()

    def toggle_active(self, db: Session, *, testimonial_id: int) -> Optional[Testimonial]:
        """Toggle the active status of a testimonial"""
        testimonial = self.get(db, id=testimonial_id)
        if testimonial:
            testimonial.is_active = not testimonial.is_active
            db.commit()
            db.refresh(testimonial)
        return testimonial

    def reorder(self, db: Session, *, testimonial_id: int, new_order: int) -> Optional[Testimonial]:
        """Update the order index of a testimonial"""
        testimonial = self.get(db, id=testimonial_id)
        if testimonial:
            testimonial.order_index = new_order
            db.commit()
            db.refresh(testimonial)
        return testimonial


testimonial = CRUDTestimonial(Testimonial)