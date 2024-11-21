from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Cruz(db.Model):
    __tablename__ = 'cruz'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    route_path = db.Column(db.JSON, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    difficulty = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    creator = db.relationship('User', back_populates='cruz')
    reviews = db.relationship('Review', back_populates='cruz', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='cruz', cascade='all, delete-orphan')
    images = db.relationship('CruzImage', back_populates='cruz', cascade='all, delete-orphan')

    def to_dict(self):
        if self.reviews:
            average_rating = round(sum(review.rating for review in self.reviews) / len(self.reviews), 1)
        else:
            average_rating = None

        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "route_path": self.route_path,
            "created_by": self.created_by,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "creator": self.creator.to_dict() if self.creator else None,
            "reviews": [review.to_dict() for review in self.reviews],
            "images": [image.to_dict() for image in self.images],
            "rating": average_rating,
        }