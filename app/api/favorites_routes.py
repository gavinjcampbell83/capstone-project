from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Favorite

favorite_routes = Blueprint('favorites', __name__)

# Get all favorites for the current user
@favorite_routes.route('', methods=['GET'])
@login_required
def get_user_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorites_list = [favorite.to_dict() for favorite in favorites]
    return jsonify(favorites_list), 200

# Add a favorite
@favorite_routes.route('', methods=['POST'])
@login_required
def add_favorite():
    user_id = current_user.id
    cruz_id = request.json.get('cruz_id')

    if not cruz_id:
        return jsonify({"error": "Cruz ID is required"}), 400

    existing_favorite = Favorite.query.filter_by(user_id=user_id, cruz_id=cruz_id).first()
    if existing_favorite:
        return jsonify({"error": "Cruz already favorited"}), 400

    favorite = Favorite(user_id=user_id, cruz_id=cruz_id)
    db.session.add(favorite)
    db.session.commit()

    return jsonify(favorite.to_dict()), 201

# Remove a favorite
@favorite_routes.route('/<int:cruz_id>', methods=['DELETE'])
@login_required
def remove_favorite(cruz_id):
    user_id = current_user.id
    favorite = Favorite.query.filter_by(user_id=user_id, cruz_id=cruz_id).first()

    if not favorite:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({"message": "Cruz unfavorited successfully"}), 200