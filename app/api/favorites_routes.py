from flask import Blueprint, request, jsonify
from app.models import db, Favorite

favorite_routes = Blueprint('favorites', __name__)

# Get all favorites for a user
@favorite_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user_favorites(user_id):
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([favorite.to_dict() for favorite in favorites]), 200

# Add a favorite
@favorite_routes.route('/', methods=['POST'])
def add_favorite():
    data = request.get_json()
    try:
        favorite = Favorite(
            user_id=data['user_id'],
            cruz_id=data['cruz_id']
        )
        db.session.add(favorite)
        db.session.commit()
        return jsonify(favorite.to_dict()), 201
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400

# Remove a favorite
@favorite_routes.route('/<int:favorite_id>', methods=['DELETE'])
def remove_favorite(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({"message": "Favorite removed successfully"}), 200