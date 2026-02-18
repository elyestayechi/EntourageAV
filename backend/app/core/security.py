from fastapi import HTTPException, Request
from app.core.config import settings


def verify_admin_credentials(username: str, password: str) -> bool:
    """
    Verify admin credentials against environment variables.
    
    Args:
        username: Provided username
        password: Provided password
        
    Returns:
        bool: True if credentials match, False otherwise
    """
    return (
        username == settings.ADMIN_USERNAME and 
        password == settings.ADMIN_PASSWORD
    )


def create_admin_session(request: Request) -> None:
    """
    Create admin session by setting session data.
    
    Args:
        request: FastAPI request object
    """
    request.session["is_admin"] = True
    request.session["username"] = settings.ADMIN_USERNAME


def destroy_admin_session(request: Request) -> None:
    """
    Destroy admin session by clearing session data.
    
    Args:
        request: FastAPI request object
    """
    request.session.clear()


def check_admin_session(request: Request) -> bool:
    """
    Check if current session is authenticated as admin.
    
    Args:
        request: FastAPI request object
        
    Returns:
        bool: True if admin session exists
    """
    return request.session.get("is_admin", False)


def require_admin(request: Request) -> bool:
    """
    Dependency to require admin authentication.
    Raises HTTPException if not authenticated.
    
    Args:
        request: FastAPI request object
        
    Returns:
        bool: True if authenticated
        
    Raises:
        HTTPException: 403 if not authenticated
    """
    if not check_admin_session(request):
        raise HTTPException(
            status_code=403,
            detail="Not authenticated. Admin access required."
        )
    return True