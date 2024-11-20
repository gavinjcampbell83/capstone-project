from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_review_images():
    review_image_1 = ReviewImage(
        review_id=1,
        image_url="https://gearjunkie.com/legacy/images/17595.jpg",
        is_primary=True,
        alt_text="A beautiful view of the route, amazing fog today!",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    review_image_2 = ReviewImage(
        review_id=2,
        image_url="https://media.istockphoto.com/id/1309037300/photo/central-park-in-spring.jpg?s=612x612&w=0&k=20&c=kskBTQliaOGRno0CcNl5GxWBislFyzVXOYWxzo_A1m8=",
        is_primary=False,
        alt_text="Scenic shot of the trail",
        order=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    review_image_3 = ReviewImage(
        review_id=3,
        image_url="https://media.istockphoto.com/id/948363058/photo/sunbeams-over-the-hollywood-hills.jpg?s=612x612&w=0&k=20&c=YfmptVuCYwGPFsxJhiGaV4ClK79hYGvAN8RZ5aA0-JI=",
        is_primary=False,
        alt_text="Amazing sunset view",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(review_image_1)
    db.session.add(review_image_2)
    db.session.add(review_image_3)
    db.session.commit()

def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_images"))

    db.session.commit()