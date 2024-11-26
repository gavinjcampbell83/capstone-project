from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class CruzImage(db.Model):
    __tablename__ = 'cruz_images'

    id = db.Column(db.Integer, primary_key=True)
    cruz_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cruz.id')), nullable=False)
    image_url = db.Column(db.Text, nullable=False)
    is_primary = db.Column(db.Boolean, default=False)
    alt_text = db.Column(db.Text)
    order = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    cruz = db.relationship('Cruz', back_populates='images')

    def to_dict(self):
        return {
            "id": self.id,
            "cruz_id": self.cruz_id,
            "image_url": self.image_url,
            "is_primary": self.is_primary,
            "alt_text": self.alt_text,
            "order": self.order,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat()
        }