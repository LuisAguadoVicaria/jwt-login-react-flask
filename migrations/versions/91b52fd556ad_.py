"""empty message

Revision ID: 91b52fd556ad
Revises: 09976dc604da
Create Date: 2022-07-02 23:54:06.277486

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91b52fd556ad'
down_revision = '09976dc604da'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('token', sa.String(length=256), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'token')
    # ### end Alembic commands ###