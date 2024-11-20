from flask.cli import AppGroup
from .users import seed_users, undo_users
from .cruzs import seed_cruzs, undo_cruzs
from .reviews import seed_reviews, undo_reviews
from .favorites import seed_favorites, undo_favorites
from .followers import seed_followers, undo_followers
from .review_images import seed_review_images, undo_review_images
from .cruz_images import seed_cruz_images, undo_cruz_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_cruz_images()
        undo_review_images()
        undo_followers()
        undo_favorites()
        undo_reviews()
        undo_cruzs()
        undo_users()
    seed_users()
    seed_cruzs()
    seed_reviews()
    seed_favorites()
    seed_followers()
    seed_review_images()
    seed_cruz_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_cruz_images()
    undo_review_images()
    undo_followers()
    undo_favorites()
    undo_reviews()
    undo_cruzs()
    undo_users()
    # Add other undo functions here
