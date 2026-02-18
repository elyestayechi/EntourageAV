from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, require_admin
from app.crud import service as crud_service
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("/", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    """
    Get all services.
    Public endpoint - no authentication required.
    
    Args:
        db: Database session
        
    Returns:
        List of all services ordered by number
    """
    services = crud_service.get_all(db)
    return services


@router.get("/{service_id}", response_model=ServiceResponse)
def get_service(service_id: int, db: Session = Depends(get_db)):
    """
    Get a single service by ID.
    Public endpoint - no authentication required.
    
    Args:
        service_id: Service ID
        db: Database session
        
    Returns:
        Service details
        
    Raises:
        HTTPException: 404 if service not found
    """
    service = crud_service.get(db, id=service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@router.get("/slug/{slug}", response_model=ServiceResponse)
def get_service_by_slug(slug: str, db: Session = Depends(get_db)):
    """
    Get a single service by slug.
    Public endpoint - no authentication required.
    
    Args:
        slug: Service slug
        db: Database session
        
    Returns:
        Service details
        
    Raises:
        HTTPException: 404 if service not found
    """
    service = crud_service.get_by_slug(db, slug=slug)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@router.post("/", response_model=ServiceResponse, dependencies=[Depends(require_admin)])
def create_service(service_in: ServiceCreate, db: Session = Depends(get_db)):
    """
    Create a new service.
    Admin only endpoint.
    
    Args:
        service_in: Service data
        db: Database session
        
    Returns:
        Created service
        
    Raises:
        HTTPException: 400 if slug already exists
    """
    # Check if slug already exists
    existing = crud_service.get_by_slug(db, slug=service_in.slug)
    if existing:
        raise HTTPException(status_code=400, detail="Service with this slug already exists")
    
    service = crud_service.create(db, obj_in=service_in)
    return service


@router.put("/{service_id}", response_model=ServiceResponse, dependencies=[Depends(require_admin)])
def update_service(
    service_id: int,
    service_in: ServiceUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a service.
    Admin only endpoint.
    
    Args:
        service_id: Service ID
        service_in: Updated service data
        db: Database session
        
    Returns:
        Updated service
        
    Raises:
        HTTPException: 404 if service not found
    """
    service = crud_service.get(db, id=service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    # Check if new slug conflicts with existing service
    if service_in.slug and service_in.slug != service.slug:
        existing = crud_service.get_by_slug(db, slug=service_in.slug)
        if existing:
            raise HTTPException(status_code=400, detail="Service with this slug already exists")
    
    service = crud_service.update(db, db_obj=service, obj_in=service_in)
    return service


@router.delete("/{service_id}", dependencies=[Depends(require_admin)])
def delete_service(service_id: int, db: Session = Depends(get_db)):
    """
    Delete a service.
    Admin only endpoint.
    
    Args:
        service_id: Service ID
        db: Database session
        
    Returns:
        Success message
        
    Raises:
        HTTPException: 404 if service not found
    """
    service = crud_service.get(db, id=service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    crud_service.delete(db, id=service_id)
    return {"message": "Service deleted successfully"}