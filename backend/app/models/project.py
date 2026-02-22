from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Project(Base):
    """Project model for portfolio projects"""
    
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    number = Column(String(10), nullable=False)  # "01", "02"
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False, index=True)  # "renovation", "salle-de-bain"
    location = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    duration = Column(String(100), nullable=True)  # "6 semaines"
    surface = Column(String(100), nullable=True)  # "85m²"
    image = Column(String(500), nullable=True)      # ✅ Cover image URL
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationship
    images = relationship("ProjectImage", back_populates="project", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Project {self.number}: {self.title}>"


class ProjectImage(Base):
    """ProjectImage model for before/after image pairs"""
    
    __tablename__ = "project_images"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False, index=True)
    before_image = Column(String(500), nullable=False)
    after_image = Column(String(500), nullable=False)
    label = Column(String(255), nullable=True)  # "Salon principal"
    order_index = Column(Integer, default=0, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationship
    project = relationship("Project", back_populates="images")
    
    def __repr__(self):
        return f"<ProjectImage {self.id} for Project {self.project_id}>"