from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from app.crud.base import CRUDBase
from app.models.project import Project, ProjectImage
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectImageCreate


class CRUDProject(CRUDBase[Project, ProjectCreate, ProjectUpdate]):
    """CRUD operations for Project model"""

    def get(self, db: Session, id: int) -> Optional[Project]:
        """Get a single project by ID, eagerly loading images"""
        return (
            db.query(Project)
            .options(joinedload(Project.images))
            .filter(Project.id == id)
            .first()
        )

    def get_by_slug(self, db: Session, slug: str) -> Optional[Project]:
        """Get project by slug with images eagerly loaded"""
        return (
            db.query(Project)
            .options(joinedload(Project.images))
            .filter(Project.slug == slug)
            .first()
        )

    def get_by_category(self, db: Session, category: str) -> List[Project]:
        """Get projects by category with images eagerly loaded"""
        return (
            db.query(Project)
            .options(joinedload(Project.images))
            .filter(Project.category == category)
            .order_by(Project.number)
            .all()
        )

    def get_all_with_images(self, db: Session) -> List[Project]:
        """Get all projects with their images eagerly loaded, ordered by number"""
        return (
            db.query(Project)
            .options(joinedload(Project.images))
            .order_by(Project.number)
            .all()
        )

    def add_image_pair(
        self, db: Session, project_id: int, image_data: ProjectImageCreate
    ) -> ProjectImage:
        """Add an image pair to a project"""
        db_image = ProjectImage(
            project_id=project_id,
            **image_data.model_dump()
        )
        db.add(db_image)
        db.commit()
        db.refresh(db_image)
        return db_image

    def update_image_pair(
        self, db: Session, image_id: int, image_data: ProjectImageCreate
    ) -> Optional[ProjectImage]:
        """Update an existing image pair"""
        db_image = db.query(ProjectImage).filter(ProjectImage.id == image_id).first()
        if db_image:
            for field, value in image_data.model_dump().items():
                setattr(db_image, field, value)
            db.commit()
            db.refresh(db_image)
        return db_image

    def delete_image_pair(self, db: Session, image_id: int) -> Optional[ProjectImage]:
        """Delete an image pair"""
        db_image = db.query(ProjectImage).filter(ProjectImage.id == image_id).first()
        if db_image:
            db.delete(db_image)
            db.commit()
        return db_image


# Create instance
project = CRUDProject(Project)