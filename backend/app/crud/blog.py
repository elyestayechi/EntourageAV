from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.blog import BlogPost
from app.schemas.blog import BlogCreate, BlogUpdate


class CRUDBlog(CRUDBase[BlogPost, BlogCreate, BlogUpdate]):
    """CRUD operations for BlogPost model"""
    
    def get_by_slug(self, db: Session, slug: str) -> Optional[BlogPost]:
        """Get blog post by slug"""
        return db.query(BlogPost).filter(BlogPost.slug == slug).first()
    
    def get_by_category(self, db: Session, category: str) -> List[BlogPost]:
        """Get blog posts by category"""
        return db.query(BlogPost).filter(BlogPost.category == category).order_by(BlogPost.date.desc()).all()
    
    def get_all_ordered(self, db: Session, skip: int = 0, limit: int = 100) -> List[BlogPost]:
        """Get all blog posts ordered by date (newest first)"""
        return db.query(BlogPost).order_by(BlogPost.date.desc()).offset(skip).limit(limit).all()
    
    def search(self, db: Session, query: str) -> List[BlogPost]:
        """Search blog posts by title or excerpt"""
        search_pattern = f"%{query}%"
        return db.query(BlogPost).filter(
            (BlogPost.title.ilike(search_pattern)) | 
            (BlogPost.excerpt.ilike(search_pattern))
        ).order_by(BlogPost.date.desc()).all()


# Create instance
blog = CRUDBlog(BlogPost)