#!/bin/bash

# Entourage AV Backend - Quick Start Script
# This script sets up and runs the backend automatically

set -e  # Exit on error

echo "🚀 Entourage AV Backend - Quick Start"
echo "======================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL 15+ first."
    exit 1
fi

echo "✅ PostgreSQL found: $(psql --version)"
echo ""

# Step 1: Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi
echo ""

# Step 2: Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate
echo "✅ Virtual environment activated"
echo ""

# Step 3: Upgrade pip
echo "📦 Upgrading pip..."
pip install --upgrade pip --quiet
echo "✅ pip upgraded"
echo ""

# Step 4: Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt --quiet
echo "✅ Dependencies installed"
echo ""

# Step 5: Check if database exists
echo "🗄️  Checking database..."
DB_EXISTS=$(psql -U postgres -lqt | cut -d \| -f 1 | grep -w entourage_av || echo "")

if [ -z "$DB_EXISTS" ]; then
    echo "📊 Creating database 'entourage_av'..."
    createdb entourage_av
    echo "✅ Database created"
else
    echo "✅ Database 'entourage_av' already exists"
fi
echo ""

# Step 6: Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env and update DATABASE_URL, ADMIN_PASSWORD, and SECRET_KEY"
else
    echo "✅ .env file already exists"
fi
echo ""

# Step 7: Run migrations
echo "🗃️  Running database migrations..."
if [ ! -d "migrations/versions" ] || [ -z "$(ls -A migrations/versions)" ]; then
    echo "Creating initial migration..."
    alembic revision --autogenerate -m "Initial schema"
fi

echo "Applying migrations..."
alembic upgrade head
echo "✅ Database migrations complete"
echo ""

# Step 8: Start server
echo "🚀 Starting FastAPI server..."
echo "======================================"
echo "📡 API will be available at:"
echo "   - Main API: http://localhost:8000"
echo "   - Swagger UI: http://localhost:8000/docs"
echo "   - ReDoc: http://localhost:8000/redoc"
echo ""
echo "🔑 Default admin credentials:"
echo "   - Username: admin"
echo "   - Password: admin123"
echo ""
echo "Press CTRL+C to stop the server"
echo "======================================"
echo ""

uvicorn app.main:app --reload --host 0.0.0.0 --port 8000