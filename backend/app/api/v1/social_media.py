from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db, require_admin
from app.crud import social_media as crud_social_media
from app.schemas.social_media import SocialMediaCreate, SocialMediaUpdate, SocialMediaResponse

router = APIRouter(prefix="/social-media", tags=["Social Media"])


@router.get("/", response_model=List[SocialMediaResponse], dependencies=[Depends(require_admin)])
def get_all_social_media(db: Session = Depends(get_db)):
    """
    Get all social media links (including inactive).
    Admin only endpoint.
    
    Args:
        db: Database session
        
    Returns:
        List of all social media links ordered by order_index
    """
    links = crud_social_media.get_all_ordered(db)
    return links


@router.get("/active", response_model=List[SocialMediaResponse])
def get_active_social_media(db: Session = Depends(get_db)):
    """
    Get active social media links only.
    Public endpoint - no authentication required.
    This is what your frontend will call to display social media icons.
    
    Args:
        db: Database session
        
    Returns:
        List of active social media links ordered by order_index
    """
    links = crud_social_media.get_active(db)
    return links


@router.get("/{link_id}", response_model=SocialMediaResponse)
def get_social_media_link(link_id: int, db: Session = Depends(get_db)):
    """
    Get a single social media link by ID.
    Public endpoint - no authentication required.
    
    Args:
        link_id: Social media link ID
        db: Database session
        
    Returns:
        Social media link details
        
    Raises:
        HTTPException: 404 if link not found
    """
    link = crud_social_media.get(db, id=link_id)
    if not link:
        raise HTTPException(status_code=404, detail="Social media link not found")
    return link


@router.post("/", response_model=SocialMediaResponse, dependencies=[Depends(require_admin)])
def create_social_media_link(link_in: SocialMediaCreate, db: Session = Depends(get_db)):
    """
    Create a new social media link.
    Admin only endpoint.
    
    Args:
        link_in: Social media link data
        db: Database session
        
    Returns:
        Created social media link
    """
    link = crud_social_media.create(db, obj_in=link_in)
    return link


@router.put("/{link_id}", response_model=SocialMediaResponse, dependencies=[Depends(require_admin)])
def update_social_media_link(
    link_id: int,
    link_in: SocialMediaUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a social media link.
    Admin only endpoint.
    
    Args:
        link_id: Social media link ID
        link_in: Updated social media link data
        db: Database session
        
    Returns:
        Updated social media link
        
    Raises:
        HTTPException: 404 if link not found
    """
    link = crud_social_media.get(db, id=link_id)
    if not link:
        raise HTTPException(status_code=404, detail="Social media link not found")
    
    link = crud_social_media.update(db, db_obj=link, obj_in=link_in)
    return link


@router.delete("/{link_id}", dependencies=[Depends(require_admin)])
def delete_social_media_link(link_id: int, db: Session = Depends(get_db)):
    """
    Delete a social media link.
    Admin only endpoint.
    
    Args:
        link_id: Social media link ID
        db: Database session
        
    Returns:
        Success message
        
    Raises:
        HTTPException: 404 if link not found
    """
    link = crud_social_media.get(db, id=link_id)
    if not link:
        raise HTTPException(status_code=404, detail="Social media link not found")
    
    crud_social_media.delete(db, id=link_id)
    return {"message": "Social media link deleted successfully"}


@router.patch("/{link_id}/toggle", response_model=SocialMediaResponse, dependencies=[Depends(require_admin)])
def toggle_social_media_active(link_id: int, db: Session = Depends(get_db)):
    """
    Toggle social media link active/inactive status.
    Admin only endpoint.
    
    Args:
        link_id: Social media link ID
        db: Database session
        
    Returns:
        Updated social media link
        
    Raises:
        HTTPException: 404 if link not found
    """
    link = crud_social_media.toggle_active(db, link_id=link_id)
    if not link:
        raise HTTPException(status_code=404, detail="Social media link not found")
    return link


@router.patch("/{link_id}/reorder", response_model=SocialMediaResponse, dependencies=[Depends(require_admin)])
def reorder_social_media_link(
    link_id: int,
    new_order: int,
    db: Session = Depends(get_db)
):
    """
    Update social media link display order.
    Admin only endpoint.
    
    Args:
        link_id: Social media link ID
        new_order: New order_index value
        db: Database session
        
    Returns:
        Updated social media link
        
    Raises:
        HTTPException: 404 if link not found
    """
    link = crud_social_media.reorder(db, link_id=link_id, new_order=new_order)
    if not link:
        raise HTTPException(status_code=404, detail="Social media link not found")
    return link