from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db, require_admin
from app.crud import blog as crud_blog
from app.schemas.blog import BlogCreate, BlogUpdate, BlogResponse

router = APIRouter(prefix="/blog", tags=["Blog"])


@router.get("/", response_model=List[BlogResponse])
def get_blog_posts(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in title and excerpt"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get all blog posts with optional filtering.
    Public endpoint - no authentication required.
    
    Args:
        category: Optional category filter
        search: Optional search query
        skip: Number of records to skip
        limit: Maximum number of records
        db: Database session
        
    Returns:
        List of blog posts
    """
    if search:
        posts = crud_blog.search(db, query=search)
    elif category:
        posts = crud_blog.get_by_category(db, category=category)
    else:
        posts = crud_blog.get_all_ordered(db, skip=skip, limit=limit)
    return posts


@router.get("/{post_id}", response_model=BlogResponse)
def get_blog_post(post_id: int, db: Session = Depends(get_db)):
    """
    Get a single blog post by ID.
    Public endpoint - no authentication required.
    
    Args:
        post_id: Blog post ID
        db: Database session
        
    Returns:
        Blog post details
        
    Raises:
        HTTPException: 404 if post not found
    """
    post = crud_blog.get(db, id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


@router.get("/slug/{slug}", response_model=BlogResponse)
def get_blog_post_by_slug(slug: str, db: Session = Depends(get_db)):
    """
    Get a single blog post by slug.
    Public endpoint - no authentication required.
    
    Args:
        slug: Blog post slug
        db: Database session
        
    Returns:
        Blog post details
        
    Raises:
        HTTPException: 404 if post not found
    """
    post = crud_blog.get_by_slug(db, slug=slug)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


@router.post("/", response_model=BlogResponse, dependencies=[Depends(require_admin)])
def create_blog_post(post_in: BlogCreate, db: Session = Depends(get_db)):
    """
    Create a new blog post.
    Admin only endpoint.
    
    Args:
        post_in: Blog post data
        db: Database session
        
    Returns:
        Created blog post
        
    Raises:
        HTTPException: 400 if slug already exists
    """
    # Check if slug already exists
    existing = crud_blog.get_by_slug(db, slug=post_in.slug)
    if existing:
        raise HTTPException(status_code=400, detail="Blog post with this slug already exists")
    
    post = crud_blog.create(db, obj_in=post_in)
    return post


@router.put("/{post_id}", response_model=BlogResponse, dependencies=[Depends(require_admin)])
def update_blog_post(
    post_id: int,
    post_in: BlogUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a blog post.
    Admin only endpoint.
    
    Args:
        post_id: Blog post ID
        post_in: Updated blog post data
        db: Database session
        
    Returns:
        Updated blog post
        
    Raises:
        HTTPException: 404 if post not found
    """
    post = crud_blog.get(db, id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Check if new slug conflicts
    if post_in.slug and post_in.slug != post.slug:
        existing = crud_blog.get_by_slug(db, slug=post_in.slug)
        if existing:
            raise HTTPException(status_code=400, detail="Blog post with this slug already exists")
    
    post = crud_blog.update(db, db_obj=post, obj_in=post_in)
    return post


@router.delete("/{post_id}", dependencies=[Depends(require_admin)])
def delete_blog_post(post_id: int, db: Session = Depends(get_db)):
    """
    Delete a blog post.
    Admin only endpoint.
    
    Args:
        post_id: Blog post ID
        db: Database session
        
    Returns:
        Success message
        
    Raises:
        HTTPException: 404 if post not found
    """
    post = crud_blog.get(db, id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    crud_blog.delete(db, id=post_id)
    return {"message": "Blog post deleted successfully"}