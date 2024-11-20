from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_favorites():
    # Demo user favorites Cruz ID 2
    favorite_1 = Favorite(
        user_id=1,
        cruz_id=2,
        created_at=datetime.utcnow()
    )
    # Demo user favorites Cruz ID 3
    favorite_2 = Favorite(
        user_id=1,
        cruz_id=3,
        created_at=datetime.utcnow()
    )
    # Marnie favorites Cruz ID 1
    favorite_3 = Favorite(
        user_id=2,
        cruz_id=1,
        created_at=datetime.utcnow()
    )

    db.session.add(favorite_1)
    db.session.add(favorite_2)
    db.session.add(favorite_3)
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()