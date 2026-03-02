from sqlalchemy import Column, Integer, String, DateTime, UniqueConstraint
from sqlalchemy.sql import func
from app.database import Base


class Category(Base):
    """Category model — shared by projects and blog"""

    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False, index=True)  # 'project' | 'blog'
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint('slug', 'type', name='uq_category_slug_type'),
    )

    def __repr__(self):
        return f"<Category {self.type}/{self.name}>"