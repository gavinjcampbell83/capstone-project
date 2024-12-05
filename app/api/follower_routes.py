from flask import Blueprint, request, jsonify
from app.models import db, Follower

follower_routes = Blueprint("followers", __name__)

@follower_routes.route('/<int:user_id>/followers', methods=['GET'])
def get_followers(user_id):
    followers = Follower.query.filter_by(followed_id=user_id).all()
    return jsonify([{"follower_id": f.follower_id} for f in followers])

@follower_routes.route('/<int:user_id>/following', methods=['GET'])
def get_following(user_id):
    following = Follower.query.filter_by(follower_id=user_id).all()
    return jsonify([{"followed_id": f.followed_id} for f in following])

@follower_routes.route('/follow', methods=['POST'])
def follow_user():
    data = request.get_json()
    follower_id = data['follower_id']
    followed_id = data['followed_id']

    if follower_id == followed_id:
        return {"error": "You cannot follow yourself."}, 400
    
    existing_follow = Follower.query.filter_by(follower_id=follower_id, followed_id=followed_id).first()
    if existing_follow:
        return {"error": "You are already following this user."}, 400

    new_follow = Follower(follower_id=follower_id, followed_id=followed_id)
    db.session.add(new_follow)
    db.session.commit()
    return {"message": "Followed successfully."}, 201

@follower_routes.route('/unfollow', methods=['DELETE'])
def unfollow_user():
    data = request.get_json()
    follower_id = data['follower_id']
    followed_id = data['followed_id']

    follow = Follower.query.filter_by(follower_id=follower_id, followed_id=followed_id).first()
    if not follow:
        return {"error": "Follow relationship not found."}, 404

    db.session.delete(follow)
    db.session.commit()
    return {"message": "Unfollowed successfully."}, 200