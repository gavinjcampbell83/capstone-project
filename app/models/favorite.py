from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cruz_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cruz.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='favorites')
    cruz = db.relationship('Cruz', back_populates='favorites')


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "cruz_id": self.cruz_id,
            "created_at": self.created_at.isoformat(),
            "user": self.user.to_dict() if self.user else None,
            "cruz": self.cruz.to_dict() if self.cruz else None
        }