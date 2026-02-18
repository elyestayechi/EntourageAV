from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate, ContactCreate as ContactUpdate


class CRUDContact(CRUDBase[ContactSubmission, ContactCreate, ContactUpdate]):
    """CRUD operations for ContactSubmission model"""
    
    def get_all_ordered(self, db: Session, skip: int = 0, limit: int = 100) -> List[ContactSubmission]:
        """Get all contact submissions ordered by date (newest first)"""
        return db.query(ContactSubmission).order_by(ContactSubmission.created_at.desc()).offset(skip).limit(limit).all()
    
    def get_unread(self, db: Session) -> List[ContactSubmission]:
        """Get all unread contact submissions"""
        return db.query(ContactSubmission).filter(
            ContactSubmission.is_read == False
        ).order_by(ContactSubmission.created_at.desc()).all()
    
    def mark_as_read(self, db: Session, contact_id: int) -> Optional[ContactSubmission]:
        """Mark a contact submission as read"""
        db_contact = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
        if db_contact:
            db_contact.is_read = True
            db.commit()
            db.refresh(db_contact)
        return db_contact
    
    def mark_as_unread(self, db: Session, contact_id: int) -> Optional[ContactSubmission]:
        """Mark a contact submission as unread"""
        db_contact = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
        if db_contact:
            db_contact.is_read = False
            db.commit()
            db.refresh(db_contact)
        return db_contact


# Create instance
contact = CRUDContact(ContactSubmission)