from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cruz_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cruz.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False, check=db.CheckConstraint('rating BETWEEN 1 AND 5'))
    review_text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='reviews')
    cruz = db.relationship('Cruz', back_populates='reviews')
    images = db.relationship('ReviewImage', back_populates='review', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "cruz_id": self.cruz_id,
            "rating": self.rating,
            "review_text": self.review_text,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "user": self.user.to_dict() if self.user else None,
            "images": [image.to_dict() for image in self.images]
        }