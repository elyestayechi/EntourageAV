from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Database - PostgreSQL
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/entourage_av"
    
    # Admin Credentials
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "changeme123"
    
    # Security
    SECRET_KEY: str = "your-super-secret-key-change-this-in-production"
    SESSION_MAX_AGE: int = 3600  # 1 hour in seconds
    
    # CORS
    FRONTEND_URL: str = "http://localhost:5173"
    
    # File Upload
    UPLOAD_DIR: str = "./static"
    MAX_FILE_SIZE: int = 5242880  # 5MB
    ALLOWED_EXTENSIONS: str = "jpg,jpeg,png,webp"
    
    # Application
    DEBUG: bool = True
    
    @property
    def allowed_extensions_list(self) -> List[str]:
        """Convert ALLOWED_EXTENSIONS string to list"""
        return [ext.strip() for ext in self.ALLOWED_EXTENSIONS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create global settings instance
settings = Settings()