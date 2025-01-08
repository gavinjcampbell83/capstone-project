from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {
        'users': [user.to_dict(include_follow_counts=True) for user in users]
    }


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/followers')
@login_required
def user_followers(id):
    """
    Query for all followers of a user by their id and return them in a list
    of dictionaries containing follower details.
    """
    user = User.query.get(id)

    if not user:
        return {"error": "User not found"}, 404

    followers = user.followers  # Access the followers relationship
    return jsonify([
        {
            "follower_id": f.follower_id,
            "username": f.follower.username,
            "profile_picture": f.follower.profile_picture,
            "bio": f.follower.bio
        } for f in followers
    ])


@user_routes.route('/<int:id>/following')
@login_required
def user_following(id):
    """
    Query for all users a specific user is following and return them in a list
    of dictionaries containing followed user details.
    """
    user = User.query.get(id)

    if not user:
        return {"error": "User not found"}, 404

    following = user.followed  # Access the followed relationship
    return jsonify([
        {
            "followed_id": f.followed_id,
            "username": f.followed.username,
            "profile_picture": f.followed.profile_picture,
            "bio": f.followed.bio
        } for f in following
    ])