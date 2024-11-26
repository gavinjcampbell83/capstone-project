from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    review_1 = Review(
        user_id=3,
        cruz_id=1,
        rating=5,
        review_text="This was an amazing experience! The views were breathtaking, and the route was easy to follow.",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    review_2 = Review(
        user_id=2,
        cruz_id=1,
        rating=4,
        review_text="Great ride! Could get a bit crowded, but the scenery makes up for it.",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    review_3 = Review(
        user_id=3,
        cruz_id=2,
        rating=3,
        review_text="Central Park is beautiful, but the route was harder than expected.",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    review_4 = Review(
        user_id=1,
        cruz_id=3,
        rating=5,
        review_text="Hollywood Hills ride was incredible. Got to see some amazing views of LA.",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()