from app.models import db, CruzImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_cruz_images():
    cruz_image_1 = CruzImage(
        cruz_id=1,
        image_url="https://www.goldengate.org/assets/1/6/bridge.jpg",
        is_primary=True,
        alt_text="Golden Gate Bridge view",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_2 = CruzImage(
        cruz_id=2,
        image_url="https://goathouseofcreative.com/cdn/shop/articles/central-park_1600x.jpg?v=1673566063",
        is_primary=True,
        alt_text="Central Park Loop",
        order=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_3 = CruzImage(
        cruz_id=3,
        image_url="https://www.shutterstock.com/image-photo/scenic-sunset-hollywood-hills-los-260nw-627404684.jpg",
        is_primary=True,
        alt_text="Hollywood Hills Cruz",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(cruz_image_1)
    db.session.add(cruz_image_2)
    db.session.add(cruz_image_3)
    db.session.commit()

def undo_cruz_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cruz_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cruz_images"))

    db.session.commit()