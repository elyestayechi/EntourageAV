"""ensure thumbnail_image column exists

Revision ID: xxxxxx  # This will be auto-generated
Revises: 816e2ea14c73
Create Date: 2026-03-02 xx:xx:xx.xxxxxx

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector

revision = 'xxxxxx'  # Keep the auto-generated ID
down_revision = '816e2ea14c73'
branch_labels = None
depends_on = None

def upgrade():
    connection = op.get_bind()
    inspector = Inspector.from_engine(connection)
    
    # Check existing columns
    existing_columns = [col['name'] for col in inspector.get_columns('projects')]
    
    # Add thumbnail_image if missing - USING RAW SQL TO AVOID BATCH ISSUES
    if 'thumbnail_image' not in existing_columns:
        op.execute('ALTER TABLE projects ADD COLUMN thumbnail_image VARCHAR(500)')
        print("Added thumbnail_image column")
    
    # Also ensure image column exists
    if 'image' not in existing_columns:
        op.execute('ALTER TABLE projects ADD COLUMN image VARCHAR(500)')
        print("Added image column")
    
    # Ensure is_featured exists
    if 'is_featured' not in existing_columns:
        op.execute('ALTER TABLE projects ADD COLUMN is_featured BOOLEAN DEFAULT FALSE')
        print("Added is_featured column")
    
    # Check if categories table exists
    existing_tables = inspector.get_table_names()
    
    if 'categories' not in existing_tables:
        # Create categories table
        op.create_table(
            'categories',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=100), nullable=False),
            sa.Column('slug', sa.String(length=100), nullable=False),
            sa.Column('type', sa.String(length=50), nullable=False),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
            sa.PrimaryKeyConstraint('id'),
            sa.UniqueConstraint('slug', 'type', name='uq_category_slug_type'),
        )
        op.create_index(op.f('ix_categories_id'), 'categories', ['id'], unique=False)
        op.create_index(op.f('ix_categories_type'), 'categories', ['type'], unique=False)
        print("Created categories table")

def downgrade():
    # Optional: add downgrade logic if needed
    pass