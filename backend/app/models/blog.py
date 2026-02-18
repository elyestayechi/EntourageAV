from sqlalchemy import Column, Integer, String, Text, Date, DateTime
from sqlalchemy.sql import func
from app.database import Base


class BlogPost(Base):
    """BlogPost model for blog articles"""
    
    __tablename__ = "blog_posts"
    
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False, index=True)  # "Innovation", "Durabilité"
    date = Column(Date, nullable=False, index=True)
    excerpt = Column(Text, nullable=False)  # Short preview
    content = Column(Text, nullable=True)  # Full article content
    image = Column(String(500), nullable=True)
    author = Column(String(255), nullable=True)
    read_time = Column(String(50), nullable=True)  # "5 min"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<BlogPost {self.id}: {self.title}>"