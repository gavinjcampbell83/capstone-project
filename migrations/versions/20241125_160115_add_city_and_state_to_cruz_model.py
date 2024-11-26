"""Add city and state to Cruz model

Revision ID: e5d0e7c6632d
Revises: ae9d0c325055
Create Date: 2024-11-25 16:01:15.994550

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = 'e5d0e7c6632d'
down_revision = 'ae9d0c325055'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cruz', schema=SCHEMA if environment == "production" else None) as batch_op:
        batch_op.add_column(sa.Column('city', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('state', sa.String(length=100), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cruz', schema=SCHEMA if environment == "production" else None) as batch_op:
        batch_op.drop_column('state')
        batch_op.drop_column('city')

    # ### end Alembic commands ###