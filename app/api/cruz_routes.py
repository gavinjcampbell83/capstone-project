from flask import Blueprint, request, jsonify
from app.models import db, Cruz
from sqlalchemy.exc import SQLAlchemyError

cruz_routes = Blueprint('cruz', __name__)

# Get all Cruz
@cruz_routes.route('/', methods=['GET'])
def get_all_cruzs():
    try:
        cruzs = Cruz.query.all()
        return jsonify([cruz.to_dict() for cruz in cruzs]), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

# Get a specific Cruz by ID
@cruz_routes.route('/<int:cruz_id>', methods=['GET'])
def get_cruz_by_id(cruz_id):
    cruz = Cruz.query.get(cruz_id)
    if not cruz:
        return jsonify({"error": "Cruz not found"}), 404
    return jsonify(cruz.to_dict()), 200

# Create a new Cruz
@cruz_routes.route('/', methods=['POST'])
def create_cruz():
    data = request.get_json()
    try:
        cruz = Cruz(
            name=data['name'],
            description=data['description'],
            latitude=data['latitude'],
            longitude=data['longitude'],
            route_path=data['route_path'],
            created_by=data['created_by']
        )
        db.session.add(cruz)
        db.session.commit()
        return jsonify(cruz.to_dict()), 201
    except KeyError as e:
        return jsonify({"error": f"Missing field: {e}"}), 400
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

# Update an existing Cruz
@cruz_routes.route('/<int:cruz_id>', methods=['PUT'])
def update_cruz(cruz_id):
    cruz = Cruz.query.get(cruz_id)
    if not cruz:
        return jsonify({"error": "Cruz not found"}), 404
    data = request.get_json()
    try:
        cruz.name = data.get('name', cruz.name)
        cruz.description = data.get('description', cruz.description)
        cruz.latitude = data.get('latitude', cruz.latitude)
        cruz.longitude = data.get('longitude', cruz.longitude)
        cruz.route_path = data.get('route_path', cruz.route_path)
        db.session.commit()
        return jsonify(cruz.to_dict()), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500

# Delete a Cruz
@cruz_routes.route('/<int:cruz_id>', methods=['DELETE'])
def delete_cruz(cruz_id):
    cruz = Cruz.query.get(cruz_id)
    if not cruz:
        return jsonify({"error": "Cruz not found"}), 404
    try:
        db.session.delete(cruz)
        db.session.commit()
        return jsonify({"message": "Cruz deleted successfully"}), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500