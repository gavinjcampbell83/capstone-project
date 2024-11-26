from app.models import db, Follower, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_followers():
    # Demo user follows Marnie
    follower_1 = Follower(
        follower_id=1,
        followed_id=2,
        created_at=datetime.utcnow()
    )
    # Demo user follows Bobbie
    follower_2 = Follower(
        follower_id=1,
        followed_id=3,
        created_at=datetime.utcnow()
    )
    # Marnie follows Demo
    follower_3 = Follower(
        follower_id=2,
        followed_id=1,
        created_at=datetime.utcnow()
    )

    db.session.add(follower_1)
    db.session.add(follower_2)
    db.session.add(follower_3)
    db.session.commit()

def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followers"))

    db.session.commit()