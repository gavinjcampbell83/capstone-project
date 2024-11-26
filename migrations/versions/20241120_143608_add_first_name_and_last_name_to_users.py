"""Add first_name and last_name to users

Revision ID: 2a3908057a4a
Revises: 36a40590c791
Create Date: 2024-11-20 14:36:08.268825

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '2a3908057a4a'
down_revision = '36a40590c791'
branch_labels = None
depends_on = None


def upgrade():
    # Add the new columns (initially nullable to avoid conflicts)
    with op.batch_alter_table('users', schema=SCHEMA if environment == "production" else None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=40), nullable=True))
        batch_op.add_column(sa.Column('last_name', sa.String(length=40), nullable=True))

    # Populate default values for the new columns
    op.execute("UPDATE users SET first_name = 'DefaultFirstName' WHERE first_name IS NULL")
    op.execute("UPDATE users SET last_name = 'DefaultLastName' WHERE last_name IS NULL")

    # Alter the columns to be non-nullable
    with op.batch_alter_table('users', schema=SCHEMA if environment == "production" else None) as batch_op:
        batch_op.alter_column('first_name', nullable=False)
        batch_op.alter_column('last_name', nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=SCHEMA if environment == "production" else None) as batch_op:
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###
