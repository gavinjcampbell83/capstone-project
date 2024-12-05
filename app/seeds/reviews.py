from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reviews():
    reviews = [
        # Reviews for Cruz 1
        Review(
            user_id=3,
            cruz_id=1,
            rating=5,
            review_text="This was an amazing experience! The views were breathtaking, and the route was easy to follow.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        Review(
            user_id=2,
            cruz_id=1,
            rating=4,
            review_text="Great ride! Could get a bit crowded, but the scenery makes up for it.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        # Reviews for Cruz 2
        Review(
            user_id=3,
            cruz_id=2,
            rating=3,
            review_text="Central Park is beautiful, but the route was harder than expected.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        Review(
            user_id=1,
            cruz_id=2,
            rating=5,
            review_text="Central Park never disappoints. A peaceful yet exhilarating ride.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        # Reviews for Cruz 3
        Review(
            user_id=1,
            cruz_id=3,
            rating=5,
            review_text="Hollywood Hills ride was incredible. Got to see some amazing views of LA.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        Review(
            user_id=2,
            cruz_id=3,
            rating=4,
            review_text="Challenging but worth it for the views! Be prepared for some steep climbs.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        # Reviews for Cruz 4
        Review(
            user_id=3,
            cruz_id=4,
            rating=5,
            review_text="Crystal-clear waters and serene surroundings. A must-do cruz.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        # Reviews for Cruz 5
        Review(
            user_id=3,
            cruz_id=5,
            rating=5,
            review_text="The Rocky Mountains are a dream! Tough but rewarding cruz.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        Review(
            user_id=1,
            cruz_id=5,
            rating=4,
            review_text="Absolutely loved it. Bring water and be ready for this intense cruz.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        # Reviews for Cruz 6
        Review(
            user_id=1,
            cruz_id=6,
            rating=4,
            review_text="A beautiful beach ride! Perfect for a relaxing day.",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        ),
        Review(
            user_id=2,
            cruz_id=6,
            rating=5,
            review_text="Sunny beaches and easy riding. My favorite cruz so far!",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
    ]

    # Add all reviews to the session and commit
    db.session.bulk_save_objects(reviews)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()