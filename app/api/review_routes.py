from flask import Blueprint, request, jsonify
from app.models import db, Review

review_routes = Blueprint('reviews', __name__)

# Get all reviews for a Cruz
@review_routes.route('/cruz/<int:cruz_id>', methods=['GET'])
def get_reviews_for_cruz(cruz_id):
    reviews = Review.query.filter_by(cruz_id=cruz_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200

# Create a review for a Cruz
@review_routes.route('/cruz/<int:cruz_id>', methods=['POST'])
def create_review(cruz_id):
    data = request.get_json()
    try:
        review = Review(
            user_id=data['user_id'],
            cruz_id=cruz_id,
            rating=data['rating'],
            review_text=data['review_text']
        )
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400

# Update a review
@review_routes.route('/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "Review not found"}), 404
    data = request.get_json()
    review.rating = data.get('rating', review.rating)
    review.review_text = data.get('review_text', review.review_text)
    db.session.commit()
    return jsonify(review.to_dict()), 200

# Delete a review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "Review not found"}), 404
    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully"}), 200