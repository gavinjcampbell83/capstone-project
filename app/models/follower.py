from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    follower = db.relationship('User', foreign_keys=[follower_id], back_populates='followers')
    followed = db.relationship('User', foreign_keys=[followed_id], back_populates='followed')


    def to_dict(self):
        return {
            "id": self.id,
            "follower_id": self.follower_id,
            "followed_id": self.followed_id,
            "created_at": self.created_at.isoformat(),
            "follower": self.follower.to_dict() if self.follower else None,
            "followed": self.followed.to_dict() if self.followed else None
        }