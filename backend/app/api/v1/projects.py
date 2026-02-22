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

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("/", response_model=List[ProjectResponse])
def get_projects(
    category: Optional[str] = Query(None, description="Filter by category"),
    db: Session = Depends(get_db)
):
    """
    Get all projects, optionally filtered by category.
    Public endpoint - no authentication required.
    
    Args:
        category: Optional category filter
        db: Database session
        
    Returns:
        List of projects
    """
    if category:
        projects = crud_project.get_by_category(db, category=category)
    else:
        projects = crud_project.get_all_with_images(db)
    return projects


@router.get("/featured", response_model=List[ProjectResponse])
def get_featured_projects(
    db: Session = Depends(get_db),
    limit: int = Query(3, ge=1, le=10, description="Number of featured projects to return")
):
    """
    Get featured projects (limited to 3 by default).
    Public endpoint - no authentication required.
    
    Args:
        db: Database session
        limit: Maximum number of projects to return (default 3)
        
    Returns:
        List of featured projects
    """
    projects = crud_project.get_featured(db, limit=limit)
    return projects


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(project_id: int, db: Session = Depends(get_db)):
    """
    Get a single project by ID.
    Public endpoint - no authentication required.
    
    Args:
        project_id: Project ID
        db: Database session
        
    Returns:
        Project details with images
        
    Raises:
        HTTPException: 404 if project not found
    """
    project = crud_project.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.get("/slug/{slug}", response_model=ProjectResponse)
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    """
    Get a single project by slug.
    Public endpoint - no authentication required.
    
    Args:
        slug: Project slug
        db: Database session
        
    Returns:
        Project details with images
        
    Raises:
        HTTPException: 404 if project not found
    """
    project = crud_project.get_by_slug(db, slug=slug)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=ProjectResponse, dependencies=[Depends(require_admin)])
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db)):
    """
    Create a new project.
    Admin only endpoint.
    
    Args:
        project_in: Project data
        db: Database session
        
    Returns:
        Created project
        
    Raises:
        HTTPException: 400 if slug already exists
    """
    # Check if slug already exists
    existing = crud_project.get_by_slug(db, slug=project_in.slug)
    if existing:
        raise HTTPException(status_code=400, detail="Project with this slug already exists")
    
    project = crud_project.create(db, obj_in=project_in)
    return project


@router.put("/{project_id}", response_model=ProjectResponse, dependencies=[Depends(require_admin)])
def update_project(
    project_id: int,
    project_in: ProjectUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a project.
    Admin only endpoint.
    
    Args:
        project_id: Project ID
        project_in: Updated project data
        db: Database session
        
    Returns:
        Updated project
        
    Raises:
        HTTPException: 404 if project not found
    """
    project = crud_project.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if new slug conflicts
    if project_in.slug and project_in.slug != project.slug:
        existing = crud_project.get_by_slug(db, slug=project_in.slug)
        if existing:
            raise HTTPException(status_code=400, detail="Project with this slug already exists")
    
    project = crud_project.update(db, db_obj=project, obj_in=project_in)
    return project


@router.delete("/{project_id}", dependencies=[Depends(require_admin)])
def delete_project(project_id: int, db: Session = Depends(get_db)):
    """
    Delete a project.
    Admin only endpoint. Also deletes all associated images.
    
    Args:
        project_id: Project ID
        db: Database session
        
    Returns:
        Success message
        
    Raises:
        HTTPException: 404 if project not found
    """
    project = crud_project.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    crud_project.delete(db, id=project_id)
    return {"message": "Project deleted successfully"}


# Project Images endpoints
@router.post("/{project_id}/images", response_model=ProjectImageResponse, dependencies=[Depends(require_admin)])
def add_project_image(
    project_id: int,
    image_in: ProjectImageCreate,
    db: Session = Depends(get_db)
):
    """
    Add an image pair to a project.
    Admin only endpoint.
    
    Args:
        project_id: Project ID
        image_in: Image pair data
        db: Database session
        
    Returns:
        Created image pair
        
    Raises:
        HTTPException: 404 if project not found
    """
    project = crud_project.get(db, id=project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    image = crud_project.add_image_pair(db, project_id=project_id, image_data=image_in)
    return image


@router.put("/images/{image_id}", response_model=ProjectImageResponse, dependencies=[Depends(require_admin)])
def update_project_image(
    image_id: int,
    image_in: ProjectImageCreate,
    db: Session = Depends(get_db)
):
    """
    Update a project image pair.
    Admin only endpoint.
    
    Args:
        image_id: Image ID
        image_in: Updated image data
        db: Database session
        
    Returns:
        Updated image pair
        
    Raises:
        HTTPException: 404 if image not found
    """
    image = crud_project.update_image_pair(db, image_id=image_id, image_data=image_in)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return image


@router.delete("/images/{image_id}", dependencies=[Depends(require_admin)])
def delete_project_image(image_id: int, db: Session = Depends(get_db)):
    """
    Delete a project image pair.
    Admin only endpoint.
    
    Args:
        image_id: Image ID
        db: Database session
        
    Returns:
        Success message
        
    Raises:
        HTTPException: 404 if image not found
    """
    image = crud_project.delete_image_pair(db, image_id=image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    return {"message": "Image deleted successfully"}