from app.models import db, Cruz, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_cruzs():
    cruz_1 = Cruz(
        name="Golden Gate Cruz",
        description="A scenic ride across the Golden Gate Bridge.",
        start_lat=37.8199,
        start_lng=-122.4783,
        end_lat=37.8029,
        end_lng=-122.4111,
        city="San Francisco",
        state="California",
        created_by=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        difficulty="Easy"
    )

    cruz_2 = Cruz(
        name="Central Park Loop",
        description="Explore the beauty of Central Park in this amazing loop.",
        start_lat=40.7851,
        start_lng=-73.9683,
        end_lat=40.7644,
        end_lng=-73.9738,
        city="New York",
        state="New York",
        created_by=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        difficulty="Easy"
    )

    cruz_3 = Cruz(
        name="Hollywood Hills Cruz",
        description="Take a ride through the iconic Hollywood Hills.",
        start_lat=34.1177,
        start_lng=-118.3520,
        end_lat=34.1402,
        end_lng=-118.3051,
        city="Los Angeles",
        state="California",
        created_by=3,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        difficulty="Hard"
    )

    db.session.add(cruz_1)
    db.session.add(cruz_2)
    db.session.add(cruz_3)
    db.session.commit()



def undo_cruzs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cruz RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cruz"))
        
    db.session.commit()