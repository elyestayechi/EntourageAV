from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db, require_admin
from app.crud import testimonial as crud_testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate, TestimonialResponse

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])


@router.get("/", response_model=List[TestimonialResponse], dependencies=[Depends(require_admin)])
def get_all_testimonials(db: Session = Depends(get_db)):
    """
    Get all testimonials (including inactive).
    Admin only endpoint.
    
    Args:
        db: Database session
        
    Returns:
        List of all testimonials ordered by order_index
    """
    testimonials = crud_testimonial.get_all_ordered(db)
    return testimonials


@router.get("/active", response_model=List[TestimonialResponse])
def get_active_testimonials(db: Session = Depends(get_db)):
    """
    Get active testimonials only.
    Public endpoint - no authentication required.
    This is what your frontend will call to display testimonials.
    
    Args:
        db: Database session
        
    Returns:
        List of active testimonials ordered by order_index
    """
    testimonials = crud_testimonial.get_active(db)
    return testimonials


@router.get("/featured", response_model=List[TestimonialResponse])
def get_featured_testimonials(
    db: Session = Depends(get_db),
    limit: int = Query(3, ge=1, le=10, description="Number of featured testimonials to return")
):
    """
    Get featured testimonials (limited to 3 by default).
    Public endpoint - no authentication required.
    
    Args:
        db: Database session
        limit: Maximum number of testimonials to return (default 3)
        
    Returns:
        List of featured testimonials (active and featured)
    """
    testimonials = crud_testimonial.get_featured(db, limit=limit)
    return testimonials


@router.get("/{testimonial_id}", response_model=TestimonialResponse)
def get_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    """
    Get a single testimonial by ID.
    Public endpoint - no authentication required.
    
    Args:
        testimonial_id: Testimonial ID
        db: Database session
        
    Returns:
        Testimonial details
        
    Raises:
        HTTPException: 404 if testimonial not found
    """
    testimonial = crud_testimonial.get(db, id=testimonial_id)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return testimonial


@router.post("/", response_model=TestimonialResponse, dependencies=[Depends(require_admin)])
def create_testimonial(testimonial_in: TestimonialCreate, db: Session = Depends(get_db)):
    """
    Create a new testimonial.
    Admin only endpoint.
    
    Args:
        testimonial_in: Testimonial data
        db: Database session
        
    Returns:
        Created testimonial
    """
    testimonial = crud_testimonial.create(db, obj_in=testimonial_in)
    return testimonial


@router.put("/{testimonial_id}", response_model=TestimonialResponse, dependencies=[Depends(require_admin)])
def update_testimonial(
    testimonial_id: int,
    testimonial_in: TestimonialUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a testimonial.
    Admin only endpoint.
    
    Args:
        testimonial_id: Testimonial ID
        testimonial_in: Updated testimonial data
        db: Database session
        
    Returns:
        Updated testimonial
        
    Raises:
        HTTPException: 404 if testimonial not found
    """
    testimonial = crud_testimonial.get(db, id=testimonial_id)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    testimonial = crud_testimonial.update(db, db_obj=testimonial, obj_in=testimonial_in)
    return testimonial


@router.delete("/{testimonial_id}", dependencies=[Depends(require_admin)])
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    """
    Delete a testimonial.
    Admin only endpoint.
    
    Args:
        testimonial_id: Testimonial ID
        db: Database session
        
    Returns:
        Success message
        
    Raises:
        HTTPException: 404 if testimonial not found
    """
    testimonial = crud_testimonial.get(db, id=testimonial_id)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    crud_testimonial.delete(db, id=testimonial_id)
    return {"message": "Testimonial deleted successfully"}


@router.patch("/{testimonial_id}/toggle", response_model=TestimonialResponse, dependencies=[Depends(require_admin)])
def toggle_testimonial_active(testimonial_id: int, db: Session = Depends(get_db)):
    """
    Toggle testimonial active/inactive status.
    Admin only endpoint.
    
    Args:
        testimonial_id: Testimonial ID
        db: Database session
        
    Returns:
        Updated testimonial
        
    Raises:
        HTTPException: 404 if testimonial not found
    """
    testimonial = crud_testimonial.toggle_active(db, testimonial_id=testimonial_id)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return testimonial


@router.patch("/{testimonial_id}/reorder", response_model=TestimonialResponse, dependencies=[Depends(require_admin)])
def reorder_testimonial(
    testimonial_id: int,
    new_order: int,
    db: Session = Depends(get_db)
):
    """
    Update testimonial display order.
    Admin only endpoint.
    
    Args:
        testimonial_id: Testimonial ID
        new_order: New order_index value
        db: Database session
        
    Returns:
        Updated testimonial
        
    Raises:
        HTTPException: 404 if testimonial not found
    """
    testimonial = crud_testimonial.reorder(db, testimonial_id=testimonial_id, new_order=new_order)
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return testimonial