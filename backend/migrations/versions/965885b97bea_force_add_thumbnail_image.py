"""force_add_thumbnail_image

Revision ID: xxxxxx  # Keep the auto-generated ID
Revises: 816e2ea14c73
Create Date: 2026-03-02 xx:xx:xx.xxxxxx

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector

# revision identifiers, used by Alembic
revision = 'xxxxxx'  # Replace with your auto-generated ID
down_revision = '816e2ea14c73'
branch_labels = None
depends_on = None

def upgrade():
    connection = op.get_bind()
    inspector = Inspector.from_engine(connection)
    
    # Get existing columns
    existing_columns = [col['name'] for col in inspector.get_columns('projects')]
    existing_tables = inspector.get_table_names()
    
    print("\n" + "="*50)
    print("FORCE MIGRATION: Adding missing columns")
    print("="*50)
    
    # FORCE ADD thumbnail_image - using raw SQL to be sure
    if 'thumbnail_image' not in existing_columns:
        op.execute('ALTER TABLE projects ADD COLUMN thumbnail_image VARCHAR(500)')
        print("✅ Added thumbnail_image column to projects table")
    else:
        print("✅ thumbnail_image column already exists")
    
    # Also ensure image column exists
    if 'image' not in existing_columns:
        op.execute('ALTER TABLE projects ADD COLUMN image VARCHAR(500)')
        print("✅ Added image column to projects table")
    else:
        print("✅ image column already exists")
    
    # Ensure is_featured exists
    if 'is_featured' not in existing_columns:
        op.execute('ALTER TABLE projects ADD COLUMN is_featured BOOLEAN DEFAULT FALSE')
        print("✅ Added is_featured column to projects table")
    else:
        print("✅ is_featured column already exists")
    
    # Check if categories table exists
    if 'categories' not in existing_tables:
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
        print("✅ Created categories table")
    else:
        print("✅ categories table already exists")
    
    # Check for project_categories association table
    if 'project_categories' not in existing_tables:
        op.create_table(
            'project_categories',
            sa.Column('project_id', sa.Integer(), nullable=False),
            sa.Column('category_id', sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ondelete='CASCADE'),
            sa.PrimaryKeyConstraint('project_id', 'category_id')
        )
        op.create_index('ix_project_categories_project_id', 'project_categories', ['project_id'])
        op.create_index('ix_project_categories_category_id', 'project_categories', ['category_id'])
        print("✅ Created project_categories association table")
    else:
        print("✅ project_categories table already exists")
    
    print("="*50 + "\n")

def downgrade():
    # Optional: add downgrade logic if needed
    print("Downgrade not implemented - this migration only adds missing columns")