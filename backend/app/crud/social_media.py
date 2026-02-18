from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.social_media import SocialMediaLink
from app.schemas.social_media import SocialMediaCreate, SocialMediaUpdate


class CRUDSocialMedia(CRUDBase[SocialMediaLink, SocialMediaCreate, SocialMediaUpdate]):
    """CRUD operations for SocialMediaLink model"""
    
    def get_active(self, db: Session) -> List[SocialMediaLink]:
        """Get all active social media links ordered by order_index"""
        return db.query(SocialMediaLink).filter(
            SocialMediaLink.is_active == True
        ).order_by(SocialMediaLink.order_index).all()
    
    def get_all_ordered(self, db: Session) -> List[SocialMediaLink]:
        """Get all social media links ordered by order_index"""
        return db.query(SocialMediaLink).order_by(SocialMediaLink.order_index).all()
    
    def get_by_platform(self, db: Session, platform: str) -> Optional[SocialMediaLink]:
        """Get social media link by platform"""
        return db.query(SocialMediaLink).filter(SocialMediaLink.platform == platform).first()
    
    def toggle_active(self, db: Session, link_id: int) -> Optional[SocialMediaLink]:
        """Toggle social media link active status"""
        db_link = db.query(SocialMediaLink).filter(SocialMediaLink.id == link_id).first()
        if db_link:
            db_link.is_active = not db_link.is_active
            db.commit()
            db.refresh(db_link)
        return db_link
    
    def reorder(self, db: Session, link_id: int, new_order: int) -> Optional[SocialMediaLink]:
        """Update social media link order_index"""
        db_link = db.query(SocialMediaLink).filter(SocialMediaLink.id == link_id).first()
        if db_link:
            db_link.order_index = new_order
            db.commit()
            db.refresh(db_link)
        return db_link


# Create instance
social_media = CRUDSocialMedia(SocialMediaLink)