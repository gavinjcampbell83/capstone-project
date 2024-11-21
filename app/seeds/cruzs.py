from app.models import db, Cruz, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_cruzs():
    cruz_1 = Cruz(
        name="Golden Gate Cruz",
        description="A scenic ride across the Golden Gate Bridge.",
        latitude=37.8199,
        longitude=-122.4783,
        route_path=[
            {"lat": 37.8199, "lng": -122.4783},
            {"lat": 37.8083, "lng": -122.4177},
            {"lat": 37.8029, "lng": -122.4111}
        ],
        created_by=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        difficulty="Easy"
    )

    cruz_2 = Cruz(
        name="Central Park Loop",
        description="Explore the beauty of Central Park in this amazing loop.",
        latitude=40.7851,
        longitude=-73.9683,
        route_path=[
            {"lat": 40.7851, "lng": -73.9683},
            {"lat": 40.7742, "lng": -73.9717},
            {"lat": 40.7644, "lng": -73.9738}
        ],
        created_by=2,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
        difficulty="Easy"
    )

    cruz_3 = Cruz(
        name="Hollywood Hills Cruz",
        description="Take a ride through the iconic Hollywood Hills.",
        latitude=34.1177,
        longitude=-118.3520,
        route_path=[
            {"lat": 34.1177, "lng": -118.3520},
            {"lat": 34.1341, "lng": -118.3215},
            {"lat": 34.1402, "lng": -118.3051}
        ],
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