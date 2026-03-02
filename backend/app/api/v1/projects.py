from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db, require_admin
from app.crud import project as crud_project
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
    ProjectResponse,
    ProjectImageCreate,
    ProjectImageResponse,
)
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryResponse
import re

router = APIRouter(prefix="/projects", tags=["Projects"])


# ─── Category endpoints ────────────────────────────────────────────────────────

@router.get("/categories", response_model=List[CategoryResponse])
def get_project_categories(db: Session = Depends(get_db)):
    """Get all project categories"""
    return db.query(Category).filter(Category.type == "project").order_by(Category.name).all()


@router.post("/categories", response_model=CategoryResponse, dependencies=[Depends(require_admin)])
def create_project_category(category_in: CategoryCreate, db: Session = Depends(get_db)):
    """Create a new project category"""
    slug = re.sub(r'[^a-z0-9]+', '-', category_in.name.lower()).strip('-')
    existing = db.query(Category).filter(Category.slug == slug, Category.type == "project").first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")
    cat = Category(name=category_in.name, slug=slug, type="project")
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat


@router.delete("/categories/{category_id}", dependencies=[Depends(require_admin)])
def delete_project_category(category_id: int, db: Session = Depends(get_db)):
    """Delete a project category"""
    cat = db.query(Category).filter(Category.id == category_id, Category.type == "project").first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(cat)
    db.commit()
    return {"message": "Category deleted"}


# ─── Project endpoints ─────────────────────────────────────────────────────────

@router.get("/", response_model=List[ProjectResponse])
def get_projects(
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    if category:
        return crud_project.get_by_category(db, category=category)
    return crud_project.get_all_with_images(db)


@router.get("/featured", response_model=List[ProjectResponse])
def get_featured_projects(
    db: Session = Depends(get_db),
    limit: int = Query(3, ge=1, le=10)
):
    return crud_project.get_featured(db, limit=limit)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = crud_project.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/slug/{slug}", response_model=ProjectResponse)
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    project = crud_project.get_by_slug(db, slug=slug)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=ProjectResponse, dependencies=[Depends(require_admin)])
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db)):
    existing = crud_project.get_by_slug(db, slug=project_in.slug)
    if existing:
        raise HTTPException(status_code=400, detail="Project with this slug already exists")
    return crud_project.create(db, obj_in=project_in)


@router.put("/{project_id}", response_model=ProjectResponse, dependencies=[Depends(require_admin)])
def update_project(project_id: int, project_in: ProjectUpdate, db: Session = Depends(get_db)):
    project = crud_project.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if project_in.slug and project_in.slug != project.slug:
        existing = crud_project.get_by_slug(db, slug=project_in.slug)
        if existing:
            raise HTTPException(status_code=400, detail="Project with this slug already exists")
    return crud_project.update(db, db_obj=project, obj_in=project_in)


@router.delete("/{project_id}", dependencies=[Depends(require_admin)])
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = crud_project.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    crud_project.delete(db, id=project_id)
    return {"message": "Project deleted successfully"}


@router.post("/{project_id}/images", response_model=ProjectImageResponse, dependencies=[Depends(require_admin)])
def add_project_image(project_id: int, image_in: ProjectImageCreate, db: Session = Depends(get_db)):
    project = crud_project.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return crud_project.add_image_pair(db, project_id=project_id, image_data=image_in)


@router.put("/images/{image_id}", response_model=ProjectImageResponse, dependencies=[Depends(require_admin)])
def update_project_image(image_id: int, image_in: ProjectImageCreate, db: Session = Depends(get_db)):
    image = crud_project.update_image_pair(db, image_id=image_id, image_data=image_in)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return image


@router.delete("/images/{image_id}", dependencies=[Depends(require_admin)])
def delete_project_image(image_id: int, db: Session = Depends(get_db)):
    image = crud_project.delete_image_pair(db, image_id=image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted successfully"}