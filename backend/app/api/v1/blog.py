from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.deps import get_db, require_admin
from app.crud import blog as crud_blog
from app.schemas.blog import BlogCreate, BlogUpdate, BlogResponse
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryResponse
import re

router = APIRouter(prefix="/blog", tags=["Blog"])


# ─── Category endpoints ────────────────────────────────────────────────────────

@router.get("/categories", response_model=List[CategoryResponse])
def get_blog_categories(db: Session = Depends(get_db)):
    """Get all blog categories"""
    return db.query(Category).filter(Category.type == "blog").order_by(Category.name).all()


@router.post("/categories", response_model=CategoryResponse, dependencies=[Depends(require_admin)])
def create_blog_category(category_in: CategoryCreate, db: Session = Depends(get_db)):
    """Create a new blog category"""
    slug = re.sub(r'[^a-z0-9]+', '-', category_in.name.lower()).strip('-')
    existing = db.query(Category).filter(Category.slug == slug, Category.type == "blog").first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")
    cat = Category(name=category_in.name, slug=slug, type="blog")
    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat


@router.delete("/categories/{category_id}", dependencies=[Depends(require_admin)])
def delete_blog_category(category_id: int, db: Session = Depends(get_db)):
    """Delete a blog category"""
    cat = db.query(Category).filter(Category.id == category_id, Category.type == "blog").first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(cat)
    db.commit()
    return {"message": "Category deleted"}


# ─── Blog post endpoints ───────────────────────────────────────────────────────

@router.get("/", response_model=List[BlogResponse])
def get_blog_posts(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    if search:
        return crud_blog.search(db, query=search)
    elif category:
        return crud_blog.get_by_category(db, category=category)
    return crud_blog.get_all_ordered(db, skip=skip, limit=limit)


@router.get("/{post_id}", response_model=BlogResponse)
def get_blog_post(post_id: int, db: Session = Depends(get_db)):
    post = crud_blog.get(db, id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


@router.get("/slug/{slug}", response_model=BlogResponse)
def get_blog_post_by_slug(slug: str, db: Session = Depends(get_db)):
    post = crud_blog.get_by_slug(db, slug=slug)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post


@router.post("/", response_model=BlogResponse, dependencies=[Depends(require_admin)])
def create_blog_post(post_in: BlogCreate, db: Session = Depends(get_db)):
    existing = crud_blog.get_by_slug(db, slug=post_in.slug)
    if existing:
        raise HTTPException(status_code=400, detail="Blog post with this slug already exists")
    return crud_blog.create(db, obj_in=post_in)


@router.put("/{post_id}", response_model=BlogResponse, dependencies=[Depends(require_admin)])
def update_blog_post(post_id: int, post_in: BlogUpdate, db: Session = Depends(get_db)):
    post = crud_blog.get(db, id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    if post_in.slug and post_in.slug != post.slug:
        existing = crud_blog.get_by_slug(db, slug=post_in.slug)
        if existing:
            raise HTTPException(status_code=400, detail="Blog post with this slug already exists")
    return crud_blog.update(db, db_obj=post, obj_in=post_in)


@router.delete("/{post_id}", dependencies=[Depends(require_admin)])
def delete_blog_post(post_id: int, db: Session = Depends(get_db)):
    post = crud_blog.get(db, id=post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    crud_blog.delete(db, id=post_id)
    return {"message": "Blog post deleted successfully"}