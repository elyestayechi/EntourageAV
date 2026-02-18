import os
import uuid
from typing import Optional
from fastapi import UploadFile, HTTPException
from PIL import Image
from app.core.config import settings


def validate_file_extension(filename: str) -> bool:
    """
    Validate if file extension is allowed.
    
    Args:
        filename: Name of the file
        
    Returns:
        True if extension is allowed
    """
    if not filename:
        return False
    
    extension = filename.rsplit(".", 1)[-1].lower()
    return extension in settings.allowed_extensions_list


def validate_file_size(file: UploadFile) -> bool:
    """
    Validate if file size is within limit.
    
    Args:
        file: Uploaded file
        
    Returns:
        True if file size is acceptable
    """
    file.file.seek(0, 2)  # Seek to end
    file_size = file.file.tell()  # Get position (size)
    file.file.seek(0)  # Reset to beginning
    
    return file_size <= settings.MAX_FILE_SIZE


def generate_unique_filename(original_filename: str) -> str:
    """
    Generate a unique filename to avoid conflicts.
    
    Args:
        original_filename: Original file name
        
    Returns:
        Unique filename with UUID
    """
    extension = original_filename.rsplit(".", 1)[-1].lower()
    unique_id = uuid.uuid4().hex[:12]
    return f"{unique_id}.{extension}"


async def save_upload_file(file: UploadFile, subfolder: str = "") -> str:
    """
    Save uploaded file to static directory.
    
    Args:
        file: Uploaded file
        subfolder: Subdirectory within static folder (e.g., "services", "projects")
        
    Returns:
        Relative path to saved file
        
    Raises:
        HTTPException: If file validation fails
    """
    # Validate extension
    if not validate_file_extension(file.filename):
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(settings.allowed_extensions_list)}"
        )
    
    # Validate size
    if not validate_file_size(file):
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {settings.MAX_FILE_SIZE / 1024 / 1024}MB"
        )
    
    # Generate unique filename
    unique_filename = generate_unique_filename(file.filename)
    
    # Create full path
    save_dir = os.path.join(settings.UPLOAD_DIR, subfolder)
    os.makedirs(save_dir, exist_ok=True)
    
    file_path = os.path.join(save_dir, unique_filename)
    
    # Save file
    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)
    
    # Return relative path
    return os.path.join(subfolder, unique_filename).replace("\\", "/")


def delete_file(file_path: str) -> bool:
    """
    Delete a file from static directory.
    
    Args:
        file_path: Relative path to file
        
    Returns:
        True if deleted successfully
    """
    full_path = os.path.join(settings.UPLOAD_DIR, file_path)
    
    if os.path.exists(full_path):
        os.remove(full_path)
        return True
    return False


async def optimize_image(file_path: str, max_width: int = 1920, quality: int = 85) -> None:
    """
    Optimize an image file (resize and compress).
    
    Args:
        file_path: Path to image file
        max_width: Maximum width in pixels
        quality: JPEG quality (1-100)
    """
    try:
        full_path = os.path.join(settings.UPLOAD_DIR, file_path)
        
        with Image.open(full_path) as img:
            # Convert RGBA to RGB if necessary
            if img.mode == "RGBA":
                img = img.convert("RGB")
            
            # Resize if needed
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Save optimized
            img.save(full_path, optimize=True, quality=quality)
    except Exception as e:
        # If optimization fails, keep original file
        pass