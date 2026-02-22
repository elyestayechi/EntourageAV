from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.project import Project, ProjectImage
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectImageCreate


class CRUDProject(CRUDBase[Project, ProjectCreate, ProjectUpdate]):
    def get_by_slug(self, db: Session, *, slug: str) -> Optional[Project]:
        """Get a project by its slug"""
        return db.query(Project).filter(Project.slug == slug).first()

    def get_by_category(self, db: Session, *, category: str) -> List[Project]:
        """Get all projects in a category"""
        return db.query(Project).filter(Project.category == category).all()

    def get_all_with_images(self, db: Session) -> List[Project]:
        """Get all projects with their images preloaded"""
        return db.query(Project).order_by(Project.created_at.desc()).all()

    def get_featured(self, db: Session, *, limit: int = 3) -> List[Project]:
        """Get featured projects (limited to specified number)"""
        return db.query(Project)\
            .filter(Project.is_featured == True)\
            .order_by(Project.created_at.desc())\
            .limit(limit)\
            .all()

    def add_image_pair(self, db: Session, *, project_id: int, image_data: ProjectImageCreate) -> ProjectImage:
        """Add an image pair to a project"""
        db_image = ProjectImage(
            project_id=project_id,
            before_image=image_data.before_image,
            after_image=image_data.after_image,
            label=image_data.label,
            order_index=image_data.order_index,
        )
        db.add(db_image)
        db.commit()
        db.refresh(db_image)
        return db_image

    def update_image_pair(self, db: Session, *, image_id: int, image_data: ProjectImageCreate) -> Optional[ProjectImage]:
        """Update an image pair"""
        db_image = db.query(ProjectImage).filter(ProjectImage.id == image_id).first()
        if db_image:
            db_image.before_image = image_data.before_image
            db_image.after_image = image_data.after_image
            db_image.label = image_data.label
            db_image.order_index = image_data.order_index
            db.commit()
            db.refresh(db_image)
        return db_image

    def delete_image_pair(self, db: Session, *, image_id: int) -> Optional[ProjectImage]:
        """Delete an image pair"""
        db_image = db.query(ProjectImage).filter(ProjectImage.id == image_id).first()
        if db_image:
            db.delete(db_image)
            db.commit()
        return db_image


project = CRUDProject(Project)