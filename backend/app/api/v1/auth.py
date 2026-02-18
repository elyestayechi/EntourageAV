from fastapi import APIRouter, Request, HTTPException
from app.schemas.auth import LoginRequest, LoginResponse, CheckAuthResponse
from app.core.security import (
    verify_admin_credentials,
    create_admin_session,
    destroy_admin_session,
    check_admin_session,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=LoginResponse)
def login(request: Request, credentials: LoginRequest):
    """
    Admin login endpoint.
    Verifies credentials and creates session.
    
    Args:
        request: FastAPI request object
        credentials: Username and password
        
    Returns:
        Login success message
        
    Raises:
        HTTPException: 401 if credentials are invalid
    """
    if not verify_admin_credentials(credentials.username, credentials.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )
    
    # Create admin session
    create_admin_session(request)
    
    return LoginResponse(
        message="Login successful",
        is_admin=True
    )


@router.post("/logout")
def logout(request: Request):
    """
    Admin logout endpoint.
    Destroys the session.
    
    Args:
        request: FastAPI request object
        
    Returns:
        Logout success message
    """
    destroy_admin_session(request)
    
    return {"message": "Logout successful"}


@router.get("/check", response_model=CheckAuthResponse)
def check_auth(request: Request):
    """
    Check authentication status.
    Returns whether the user is authenticated.
    
    Args:
        request: FastAPI request object
        
    Returns:
        Authentication status
    """
    is_authenticated = check_admin_session(request)
    username = request.session.get("username") if is_authenticated else None
    
    return CheckAuthResponse(
        is_authenticated=is_authenticated,
        username=username
    )