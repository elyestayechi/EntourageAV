from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate


class CRUDService(CRUDBase[Service, ServiceCreate, ServiceUpdate]):
    """CRUD operations for Service model"""
    
    def get_by_slug(self, db: Session, slug: str) -> Optional[Service]:
        """Get service by slug"""
        return db.query(Service).filter(Service.slug == slug).first()
    
    def get_by_number(self, db: Session, number: str) -> Optional[Service]:
        """Get service by number"""
        return db.query(Service).filter(Service.number == number).first()
    
    def get_all(self, db: Session) -> List[Service]:
        """Get all services ordered by number"""
        return db.query(Service).order_by(Service.number).all()


# Create instance
service = CRUDService(Service)