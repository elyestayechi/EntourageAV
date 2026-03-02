#!/bin/bash
set -e  # Exit on any error

echo "========================================="
echo "Starting debug script at $(date)"
echo "========================================="

# Print environment info (excluding sensitive values)
echo "Current directory: $(pwd)"
echo "Python version: $(python --version)"
echo "PATH: $PATH"

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL is not set!"
    exit 1
else
    echo "DATABASE_URL is set (value hidden)"
fi

# Try to import the app modules
echo "Testing imports..."
python -c "
import sys
print('Python path:', sys.path)
try:
    print('Importing app.main...')
    from app.main import app
    print('✓ app.main imported successfully')
except Exception as e:
    print(f'✗ Failed to import app.main: {e}')
    sys.exit(1)
"

# Run migrations
echo "Running migrations..."
alembic upgrade head
MIGRATION_EXIT=$?
if [ $MIGRATION_EXIT -ne 0 ]; then
    echo "✗ Migration failed with exit code $MIGRATION_EXIT"
    exit $MIGRATION_EXIT
else
    echo "✓ Migrations completed successfully"
fi

# Test database connection
echo "Testing database connection..."
python -c "
from app.database import SessionLocal
from sqlalchemy import text
try:
    db = SessionLocal()
    result = db.execute(text('SELECT 1')).scalar()
    db.close()
    print(f'✓ Database connection successful (result: {result})')
except Exception as e:
    print(f'✗ Database connection failed: {e}')
    exit(1)
"

# Start the app
echo "Starting uvicorn..."
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT --log-level debug