from typing import Generator
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.core.security import check_admin_session


def get_db() -> Generator:
    """
    Dependency function to get database session.
    Automatically closes the session after the request.
    
    Yields:
        Database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def require_admin(request: Request) -> bool:
    """
    Dependency to require admin authentication.
    Checks if the session has admin privileges.
    
    Args:
        request: FastAPI request object
        
    Returns:
        True if authenticated
        
    Raises:
        HTTPException: 403 if not authenticated
    """
    if not check_admin_session(request):
        raise HTTPException(
            status_code=403,
            detail="Not authenticated. Admin access required."
        )
    return True