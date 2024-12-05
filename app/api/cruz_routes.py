from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Cruz, CruzImage
from app.forms import CruzForm, CruzImageForm
from .aws_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from sqlalchemy.exc import SQLAlchemyError

cruz_routes = Blueprint('cruz', __name__)

# Get all Cruz with optional filtering by city and state
@cruz_routes.route('/', methods=['GET'])
def get_all_cruzs():
    try:
        city = request.args.get('city', None)  # Get city from query params
        state = request.args.get('state', None)  # Get state from query params

        query = Cruz.query

        # Apply filters if query parameters are provided
        if city:
            query = query.filter(Cruz.city.ilike(f"%{city}%"))
        if state:
            query = query.filter(Cruz.state.ilike(f"%{state}%"))

        cruzs = query.all()  # Execute query
        return jsonify([cruz.to_dict() for cruz in cruzs]), 200
    except SQLAlchemyError as e:
        return jsonify({"error": str(e)}), 500
    
# Get all cruz of the Current User
@cruz_routes.route('/current', methods=['GET'])
@login_required
def get_current_user_cruzs():
    cruzs = Cruz.query.filter_by(created_by=current_user.id).all()
    return jsonify({"Cruz": [cruz.to_dict() for cruz in cruzs]}), 200

# Get a specific Cruz by ID
@cruz_routes.route('/<int:cruz_id>', methods=['GET'])
def get_cruz_by_id(cruz_id):
    cruz = Cruz.query.get(cruz_id)
    if not cruz:
        return jsonify({"error": "Cruz not found"}), 404
    return jsonify(cruz.to_dict()), 200

# Create a new Cruz
@cruz_routes.route('/', methods=['POST'])
@login_required
def create_cruz():
    form = CruzForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_cruz = Cruz(
            name=form.name.data,
            description=form.description.data,
            start_lat=form.start_lat.data,
            start_lng=form.start_lng.data,
            end_lat=form.end_lat.data,
            end_lng=form.end_lng.data,
            difficulty=form.difficulty.data,
            city=form.city.data,
            state=form.state.data,
            created_by=current_user.id
        )
        db.session.add(new_cruz)
        db.session.commit()
        return jsonify(new_cruz.to_dict()), 201

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400

# Update an existing Cruz
@cruz_routes.route('/<int:cruz_id>', methods=['PUT'])
@login_required
def update_cruz(cruz_id):
    cruz = Cruz.query.get(cruz_id)
    if not cruz:
        return jsonify({"error": "Cruz not found"}), 404

    if cruz.created_by != current_user.id:
        return jsonify({"error": "Unauthorized"}), 403

    form = CruzForm()
    print("City Data:", form.city.data)
    print("State Data:", form.state.data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        cruz.name = form.name.data
        cruz.description = form.description.data
        cruz.start_lat = form.start_lat.data
        cruz.start_lng = form.start_lng.data
        cruz.end_lat = form.end_lat.data
        cruz.end_lng = form.end_lng.data
        cruz.difficulty = form.difficulty.data
        cruz.city=form.city.data
        cruz.state=form.state.data
        db.session.commit()
        return jsonify(cruz.to_dict()), 200

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400

#Add a Cruz Image
@cruz_routes.route('/<int:cruz_id>/images', methods=['POST'])
@login_required
def add_cruz_image(cruz_id):
    cruz = Cruz.query.get(cruz_id)
    if not cruz:
        return jsonify({"message": "Cruz couldn't be found"}), 404
    if cruz.created_by != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    form = CruzImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        file = form.image.data
        upload_response = upload_file_to_s3(file)
        print('\n\nUPLOAD RESPONSE', upload_response, '\n\n')

        # Check for upload errors
        if "errors" in upload_response:
            return jsonify({"message": "Error uploading file", "errors": upload_response["errors"]}), 400

        # Create a new CruzImage object
        new_image = CruzImage(
            image_url=upload_response["url"],
            cruz_id=cruz_id,
            is_primary=form.is_primary.data,
            alt_text=file.filename,
            order=None
        )

        db.session.add(new_image)
        db.session.commit()

        return jsonify(new_image.to_dict()), 201

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400


#update cruz image
@cruz_routes.route('/<int:cruz_id>/images/<int:cruz_image_id>', methods=['PUT'])
@login_required
def update_cruz_image(cruz_id, cruz_image_id):
    cruz = Cruz.query.get(cruz_id)
    if not cruz:
        return jsonify({"message": "Cruz not found"}), 404

    image = CruzImage.query.filter_by(id=cruz_image_id, cruz_id=cruz_id).first()
    if not image:
        return jsonify({"message": "Image not found"}), 404

    if cruz.created_by != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    form = CruzImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        file = form.image.data
        upload_response = upload_file_to_s3(file)
        print('\n\nUPLOAD RESPONSE', upload_response, '\n\n')

        if "error" in upload_response:
            return jsonify({"message": "Error uploading file", "error": upload_response["error"]}), 400

        remove_file_from_s3(image.image_url)

        image.image_url = upload_response["url"]
        image.is_primary = form.is_primary.data
        db.session.commit()

        return jsonify(image.to_dict()), 200

    return jsonify({"message": "Bad Request", "errors": form.errors}), 400

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
    
@cruz_routes.route('/images/<int:image_id>', methods=['DELETE'])
@login_required
def delete_cruz_image(image_id):
    """
    Route to delete an image from a specific Cruz.
    """
    image = CruzImageForm.query.get(image_id)
    if not image:
        return jsonify({"message": "Image couldn't be found"}), 404

    cruz = Cruz.query.get(image.cruz_id)
    if not cruz or cruz.created_by != current_user.id:
        return jsonify({"message": "Unauthorized"}), 403

    remove_file_response = remove_file_from_s3(image.url)
    if isinstance(remove_file_response, dict) and "errors" in remove_file_response:
        return jsonify({"message": "Error deleting file", "errors": remove_file_response["errors"]}), 400

    db.session.delete(image)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"}), 200