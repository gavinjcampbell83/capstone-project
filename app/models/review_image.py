from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class ReviewImage(db.Model):
    __tablename__ = 'review_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    is_primary = db.Column(db.Boolean, default=False)
    alt_text = db.Column(db.Text)
    order = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    review = db.relationship('Review', back_populates='images')

    def to_dict(self):
        return {
            "id": self.id,
            "review_id": self.review_id,
            "image_url": self.image_url,
            "is_primary": self.is_primary,
            "alt_text": self.alt_text,
            "order": self.order,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }