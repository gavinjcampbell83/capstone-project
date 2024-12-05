from app.models import db, Cruz, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_cruzs():
    cruzs = [
        Cruz(
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
        ),
        Cruz(
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
        ),
        Cruz(
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
        ),
        Cruz(
            name="Lake Tahoe Scenic Cruz",
            description="Cruz along the crystal-clear waters of Lake Tahoe.",
            start_lat=38.9443,
            start_lng=-119.9773,
            end_lat=38.9431,
            end_lng=-119.9897,
            city="South Lake Tahoe",
            state="California",
            created_by=1,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Moderate"
        ),
        Cruz(
            name="Rocky Mountain Challenge",
            description="A challenging ride through the majestic Rocky Mountains.",
            start_lat=39.5501,
            start_lng=-105.7821,
            end_lat=39.7392,
            end_lng=-104.9903,
            city="Denver",
            state="Colorado",
            created_by=2,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Hard"
        ),
        Cruz(
            name="Beachside Breeze",
            description="A relaxing cruz along the sunny beaches.",
            start_lat=36.8529,
            start_lng=-75.9779,
            end_lat=36.9493,
            end_lng=-76.2388,
            city="Virginia Beach",
            state="Virginia",
            created_by=3,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Easy"
        ),
        Cruz(
            name="Grand Canyon Edge",
            description="Ride along the breathtaking edges of the Grand Canyon.",
            start_lat=36.1069,
            start_lng=-112.1129,
            end_lat=36.0544,
            end_lng=-112.1391,
            city="Grand Canyon Village",
            state="Arizona",
            created_by=1,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Hard"
        ),
        Cruz(
            name="Pacific Northwest Trek",
            description="Experience the lush landscapes of the Pacific Northwest.",
            start_lat=47.6062,
            start_lng=-122.3321,
            end_lat=45.5152,
            end_lng=-122.6784,
            city="Seattle",
            state="Washington",
            created_by=2,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Moderate"
        ),
        Cruz(
            name="Everglades Adventure",
            description="Cruz through the lush wetlands of the Everglades and spot wildlife.",
            start_lat=25.4479,
            start_lng=-80.4751,
            end_lat=25.1717,
            end_lng=-80.3741,
            city="Everglades",
            state="Florida",
            created_by=3,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Moderate"
        ),
        Cruz(
            name="Desert Dunes Challenge",
            description="Cruz across the rolling dunes of the Mojave Desert.",
            start_lat=35.1447,
            start_lng=-116.1049,
            end_lat=35.2144,
            end_lng=-115.9089,
            city="Barstow",
            state="California",
            created_by=1,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Hard"
        ),
        Cruz(
            name="Blue Ridge Parkway Cruz",
            description="Take in the stunning mountain views along the Blue Ridge Parkway.",
            start_lat=35.5951,
            start_lng=-82.5515,
            end_lat=36.1369,
            end_lng=-81.6778,
            city="Asheville",
            state="North Carolina",
            created_by=2,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Moderate"
        ),
        Cruz(
            name="Niagara Falls Loop",
            description="A scenic cruz around the world-famous Niagara Falls.",
            start_lat=43.0828,
            start_lng=-79.0742,
            end_lat=43.0962,
            end_lng=-79.0377,
            city="Niagara Falls",
            state="New York",
            created_by=3,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Easy"
        ),
        Cruz(
            name="Alaskan Wilderness Cruz",
            description="Venture through the untouched beauty of Alaska's wilderness.",
            start_lat=61.2176,
            start_lng=-149.8584,
            end_lat=61.3000,
            end_lng=-149.5800,
            city="Anchorage",
            state="Alaska",
            created_by=1,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Hard"
        ),
        Cruz(
            name="Route 66 Heritage Cruz",
            description="Follow the iconic Route 66 and enjoy the nostalgia of America's highway.",
            start_lat=35.4676,
            start_lng=-97.5164,
            end_lat=35.2213,
            end_lng=-97.4457,
            city="Oklahoma City",
            state="Oklahoma",
            created_by=2,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Moderate"
        ),
        Cruz(
            name="Zion National Park Explorer",
            description="Explore the dramatic landscapes of Zion National Park.",
            start_lat=37.2975,
            start_lng=-113.0036,
            end_lat=37.2083,
            end_lng=-112.9801,
            city="Springdale",
            state="Utah",
            created_by=3,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Moderate"
        ),
        Cruz(
            name="Cape Cod Coastal Cruz",
            description="Cruise along the charming coastline of Cape Cod.",
            start_lat=41.6699,
            start_lng=-70.2962,
            end_lat=41.6585,
            end_lng=-70.2807,
            city="Hyannis",
            state="Massachusetts",
            created_by=1,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            difficulty="Easy"
        )
    ]

    # Add all cruzs to the session and commit
    db.session.bulk_save_objects(cruzs)
    db.session.commit()


def undo_cruzs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cruz RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cruz"))
        
    db.session.commit()