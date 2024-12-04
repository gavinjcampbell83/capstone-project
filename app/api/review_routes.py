from flask import Blueprint, request, jsonify
from app.models import db, Review
from flask_login import login_required, current_user
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

# Get all reviews for a Cruz
@review_routes.route('/cruz/<int:cruz_id>', methods=['GET'])
def get_reviews_for_cruz(cruz_id):
    reviews = Review.query.filter_by(cruz_id=cruz_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200

# Create a review for a Cruz
@review_routes.route('/cruz/<int:cruz_id>', methods=['POST'])
@login_required
def create_review(cruz_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            user_id=current_user.id,
            cruz_id=cruz_id,
            rating=form.rating.data,
            review_text=form.review_text.data
        )
        db.session.add(review)
        db.session.commit()
        return jsonify(review.to_dict()), 201

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400

# Update a review
@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "Review not found"}), 404
    if review.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.rating = form.rating.data
        review.review_text = form.review_text.data
        db.session.commit()
        return jsonify(review.to_dict()), 200

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400

# Delete a review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "Review not found"}), 404
    if review.user_id != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully"}), 200