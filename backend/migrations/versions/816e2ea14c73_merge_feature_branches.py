"""merge feature branches

Revision ID: 816e2ea14c73
Revises: 2b1db5ebe3e0, a1b2c3d4e5f6
Create Date: 2026-03-02 04:25:44.323450

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '816e2ea14c73'
down_revision: Union[str, None] = ('2b1db5ebe3e0', 'a1b2c3d4e5f6')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass