from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        first_name='Demo',
        last_name='User',
        password='password',
        profile_picture='https://example.com/demo-profile.jpg',
        bio="Demo user for the application.",
        latitude=37.7749,
        longitude=-122.4194,
        city="San Francisco",
        state="California",
        country="USA",
        last_latitude=37.7749,
        last_longitude=-122.4194,
        last_location_updated_at=datetime.utcnow()
    )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        first_name='Marnie',
        last_name='Smith',
        password='password',
        profile_picture='https://example.com/marnie-profile.jpg',
        bio="Nature enthusiast and avid hiker.",
        latitude=40.7128,
        longitude=-74.0060,
        city="New York",
        state="New York",
        country="USA",
        last_latitude=40.7128,
        last_longitude=-74.0060,
        last_location_updated_at=datetime.utcnow()
    )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        first_name='Bobbie',
        last_name='Johnson',
        password='password',
        profile_picture='https://example.com/bobbie-profile.jpg',
        bio="Photographer and travel lover.",
        latitude=34.0522,
        longitude=-118.2437,
        city="Los Angeles",
        state="California",
        country="USA",
        last_latitude=34.0522,
        last_longitude=-118.2437,
        last_location_updated_at=datetime.utcnow()
    )
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
