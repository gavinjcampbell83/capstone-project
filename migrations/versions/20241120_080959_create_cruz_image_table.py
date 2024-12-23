"""Create cruz_image table

Revision ID: 36a40590c791
Revises: bb138498be3d
Create Date: 2024-11-20 08:09:59.805106

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '36a40590c791'
down_revision = 'bb138498be3d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cruz_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cruz_id', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.Text(), nullable=False),
    sa.Column('is_primary', sa.Boolean(), nullable=True),
    sa.Column('alt_text', sa.Text(), nullable=True),
    sa.Column('order', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['cruz_id'], ['cruz.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE cruz_images SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cruz_images')
    # ### end Alembic commands ###
