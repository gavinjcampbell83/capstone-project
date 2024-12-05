from app.models import db, CruzImage, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_cruz_images():
    cruz_image_1 = CruzImage(
        cruz_id=1,
        image_url="https://cruznbucket.s3.us-west-1.amazonaws.com/goldengatebridge.jpg",
        is_primary=True,
        alt_text="Golden Gate Bridge view",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_2 = CruzImage(
        cruz_id=2,
        image_url="https://cruznbucket.s3.us-west-1.amazonaws.com/centralparkjpeg.jpg",
        is_primary=True,
        alt_text="Central Park Loop",
        order=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_3 = CruzImage(
        cruz_id=3,
        image_url="https://cruznbucket.s3.us-west-1.amazonaws.com/hollywoodhills.jpg",
        is_primary=True,
        alt_text="Hollywood Hills Cruz",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_4 = CruzImage(
        cruz_id=4,
        image_url="https://cruznbucket.s3.amazonaws.com/laketahoe.jpg",
        is_primary=True,
        alt_text="Lake Tahoe Scenic Cruz",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_5 = CruzImage(
        cruz_id=5,
        image_url="https://cruznbucket.s3.amazonaws.com/rockymountains.jpg",
        is_primary=True,
        alt_text="Rocky Mountain Challenge",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_6 = CruzImage(
        cruz_id=6,
        image_url="https://cruznbucket.s3.amazonaws.com/virginiabeach.jpg",
        is_primary=True,
        alt_text="Beachside Breeze",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_7 = CruzImage(
        cruz_id=7,
        image_url="https://cruznbucket.s3.amazonaws.com/grandcanyon.jpg",
        is_primary=True,
        alt_text="Grand Canyon Edge",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_8 = CruzImage(
        cruz_id=8,
        image_url="https://cruznbucket.s3.amazonaws.com/pacificnorthwest.jpg",
        is_primary=True,
        alt_text="Pacific Northwest Trek",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_9 = CruzImage(
        cruz_id=9,
        image_url="https://cruznbucket.s3.amazonaws.com/everglades.jpg",
        is_primary=True,
        alt_text="Everglades Adventure",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_10 = CruzImage(
        cruz_id=10,
        image_url="https://cruznbucket.s3.amazonaws.com/mojavedesert.jpg",
        is_primary=True,
        alt_text="Desert Dunes Challenge",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_11 = CruzImage(
        cruz_id=11,
        image_url="https://cruznbucket.s3.amazonaws.com/blueridge.jpg",
        is_primary=True,
        alt_text="Blue Ridge Pakway",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_12 = CruzImage(
        cruz_id=12,
        image_url="https://cruznbucket.s3.amazonaws.com/niagrafalls.jpg",
        is_primary=True,
        alt_text="Niagra Falls Cruz",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_13 = CruzImage(
        cruz_id=13,
        image_url="https://cruznbucket.s3.amazonaws.com/alaskanwilderness.jpg",
        is_primary=True,
        alt_text="Alaskan Wilderness",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_14 = CruzImage(
        cruz_id=14,
        image_url="https://cruznbucket.s3.amazonaws.com/route66.jpg",
        is_primary=True,
        alt_text="Route 66",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_15 = CruzImage(
        cruz_id=15,
        image_url="https://cruznbucket.s3.amazonaws.com/zionpark.jpg",
        is_primary=True,
        alt_text="Zion Cruz",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    cruz_image_16 = CruzImage(
        cruz_id=16,
        image_url="https://cruznbucket.s3.us-west-1.amazonaws.com/capecod.jpg",
        is_primary=True,
        alt_text="Cape Cod Cruz",
        order=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(cruz_image_1)
    db.session.add(cruz_image_2)
    db.session.add(cruz_image_3)
    db.session.add(cruz_image_4)
    db.session.add(cruz_image_5)
    db.session.add(cruz_image_6)
    db.session.add(cruz_image_7)
    db.session.add(cruz_image_8)
    db.session.add(cruz_image_9)
    db.session.add(cruz_image_10)
    db.session.add(cruz_image_11)
    db.session.add(cruz_image_12)
    db.session.add(cruz_image_13)
    db.session.add(cruz_image_14)
    db.session.add(cruz_image_15)
    db.session.add(cruz_image_16)
    db.session.commit()

def undo_cruz_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cruz_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cruz_images"))

    db.session.commit()