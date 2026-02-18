from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db, require_admin
from app.crud import contact as crud_contact
from app.schemas.contact import ContactCreate, ContactResponse

router = APIRouter(prefix="/contacts", tags=["Contacts"])


@router.get("/", response_model=List[ContactResponse], dependencies=[Depends(require_admin)])
def get_contacts(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    unread_only: bool = Query(False, description="Show only unread submissions"),
    db: Session = Depends(get_db)
):
    """
    Get all contact submissions.
    Admin only endpoint.
    
    Args:
        skip: Number of records to skip
        limit: Maximum number of records
        unread_only: Filter for unread submissions only
        db: Database session
        
    Returns:
        List of contact submissions
    """
    if unread_only:
        contacts = crud_contact.get_unread(db)
    else:
        contacts = crud_contact.get_all_ordered(db, skip=skip, limit=limit)
    return contacts


@router.get("/{contact_id}", response_model=ContactResponse, dependencies=[Depends(require_admin)])
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    """
    Get a single contact submission by ID.
    Admin only endpoint.
    
    Args:
        contact_id: Contact submission ID
        db: Database session
        
    Returns:
        Contact submission details
        
    Raises:
        HTTPException: 404 if contact not found
    """
    contact = crud_contact.get(db, id=contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    return contact


@router.post("/", response_model=ContactResponse)
def submit_contact_form(contact_in: ContactCreate, db: Session = Depends(get_db)):
    """
    Submit a contact form.
    Public endpoint - no authentication required.
    This is what your frontend will call when users submit the contact form.
    
    Args:
        contact_in: Contact form data
        db: Database session
        
    Returns:
        Created contact submission
    """
    contact = crud_contact.create(db, obj_in=contact_in)
    return contact


@router.patch("/{contact_id}/read", response_model=ContactResponse, dependencies=[Depends(require_admin)])
def mark_contact_as_read(contact_id: int, db: Session = Depends(get_db)):
    """
    Mark a contact submission as read.
    Admin only endpoint.
    
    Args:
        contact_id: Contact submission ID
        db: Database session
        
    Returns:
        Updated contact submission
        
    Raises:
        HTTPException: 404 if contact not found
    """
    contact = crud_contact.mark_as_read(db, contact_id=contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    return contact


@router.patch("/{contact_id}/unread", response_model=ContactResponse, dependencies=[Depends(require_admin)])
def mark_contact_as_unread(contact_id: int, db: Session = Depends(get_db)):
    """
    Mark a contact submission as unread.
    Admin only endpoint.
    
    Args:
        contact_id: Contact submission ID
        db: Database session
        
    Returns:
        Updated contact submission
        
    Raises:
        HTTPException: 404 if contact not found
    """
    contact = crud_contact.mark_as_unread(db, contact_id=contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    return contact


@router.delete("/{contact_id}", dependencies=[Depends(require_admin)])
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    """
    Delete a contact submission.
    Admin only endpoint.
    
    Args:
        contact_id: Contact submission ID
        db: Database session
        
    Returns:
        Success message
        
    Raises:
        HTTPException: 404 if contact not found
    """
    contact = crud_contact.get(db, id=contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    
    crud_contact.delete(db, id=contact_id)
    return {"message": "Contact submission deleted successfully"}