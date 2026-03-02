"""Add image/is_featured to projects, add categories table

Revision ID: a1b2c3d4e5f6
Revises: b02f146356c4
Create Date: 2026-03-02 04:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector

# revision identifiers, used by Alembic.
revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = 'b02f146356c4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Get database connection
    connection = op.get_bind()
    inspector = Inspector.from_engine(connection)
    
    # Check which columns already exist in projects table
    existing_columns = [col['name'] for col in inspector.get_columns('projects')]
    
    # Add image column if it doesn't exist
    if 'image' not in existing_columns:
        with op.batch_alter_table('projects') as batch_op:
            batch_op.add_column(sa.Column('image', sa.String(length=500), nullable=True))
    
    # Add is_featured column if it doesn't exist
    if 'is_featured' not in existing_columns:
        with op.batch_alter_table('projects') as batch_op:
            batch_op.add_column(sa.Column('is_featured', sa.Boolean(), nullable=True, server_default='false'))
    
    # Add thumbnail_image column if it doesn't exist
    if 'thumbnail_image' not in existing_columns:
        with op.batch_alter_table('projects') as batch_op:
            batch_op.add_column(sa.Column('thumbnail_image', sa.String(length=500), nullable=True))
    
    # Check if categories table already exists
    existing_tables = inspector.get_table_names()
    
    # Create categories table if it doesn't exist
    if 'categories' not in existing_tables:
        op.create_table(
            'categories',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('name', sa.String(length=100), nullable=False),
            sa.Column('slug', sa.String(length=100), nullable=False),
            sa.Column('type', sa.String(length=50), nullable=False),  # 'project' | 'blog' | 'service'
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
            sa.PrimaryKeyConstraint('id'),
            sa.UniqueConstraint('slug', 'type', name='uq_category_slug_type'),
        )
        op.create_index(op.f('ix_categories_id'), 'categories', ['id'], unique=False)
        op.create_index(op.f('ix_categories_type'), 'categories', ['type'], unique=False)
    
    # Check if project_categories association table exists (for many-to-many relationship)
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
    
    # Check if blog_categories association table exists (for many-to-many relationship)
    if 'blog_categories' not in existing_tables:
        op.create_table(
            'blog_categories',
            sa.Column('blog_id', sa.Integer(), nullable=False),
            sa.Column('category_id', sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ondelete='CASCADE'),
            sa.ForeignKeyConstraint(['blog_id'], ['blog_posts.id'], ondelete='CASCADE'),
            sa.PrimaryKeyConstraint('blog_id', 'category_id')
        )
        op.create_index('ix_blog_categories_blog_id', 'blog_categories', ['blog_id'])
        op.create_index('ix_blog_categories_category_id', 'blog_categories', ['category_id'])


def downgrade() -> None:
    # Get database connection
    connection = op.get_bind()
    inspector = Inspector.from_engine(connection)
    
    # Drop association tables first (due to foreign keys)
    existing_tables = inspector.get_table_names()
    
    if 'blog_categories' in existing_tables:
        op.drop_index('ix_blog_categories_category_id', table_name='blog_categories')
        op.drop_index('ix_blog_categories_blog_id', table_name='blog_categories')
        op.drop_table('blog_categories')
    
    if 'project_categories' in existing_tables:
        op.drop_index('ix_project_categories_category_id', table_name='project_categories')
        op.drop_index('ix_project_categories_project_id', table_name='project_categories')
        op.drop_table('project_categories')
    
    if 'categories' in existing_tables:
        op.drop_index(op.f('ix_categories_type'), table_name='categories')
        op.drop_index(op.f('ix_categories_id'), table_name='categories')
        op.drop_table('categories')
    
    # Check which columns exist in projects table
    existing_columns = [col['name'] for col in inspector.get_columns('projects')]
    
    # Only drop columns that exist
    with op.batch_alter_table('projects') as batch_op:
        if 'thumbnail_image' in existing_columns:
            batch_op.drop_column('thumbnail_image')
        if 'is_featured' in existing_columns:
            batch_op.drop_column('is_featured')
        if 'image' in existing_columns:
            batch_op.drop_column('image')