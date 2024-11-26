from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError

class CruzForm(FlaskForm):
    name = StringField(
        'Name',
        validators=[
            DataRequired(),
            Length(min=2, max=100, message="Name must be between 2 and 100 characters.")
        ]
    )
    description = StringField(
        'Description',
        validators=[
            DataRequired(),
            Length(min=10, max=500, message="Description must be between 10 and 500 characters.")
        ]
    )
    start_lat = FloatField(
        'Start Latitude',
        validators=[
            DataRequired(),
            NumberRange(min=-90, max=90, message="Latitude must be between -90 and 90.")
        ]
    )
    start_lng = FloatField(
        'Start Longitude',
        validators=[
            DataRequired(),
            NumberRange(min=-180, max=180, message="Longitude must be between -180 and 180.")
        ]
    )
    end_lat = FloatField(
        'End Latitude',
        validators=[
            DataRequired(),
            NumberRange(min=-90, max=90, message="Latitude must be between -90 and 90.")
        ]
    )
    end_lng = FloatField(
        'End Longitude',
        validators=[
            DataRequired(),
            NumberRange(min=-180, max=180, message="Longitude must be between -180 and 180.")
        ]
    )
    difficulty = SelectField(
        'Difficulty',
        choices=[('Easy', 'Easy'), ('Moderate', 'Moderate'), ('Hard', 'Hard')],
        validators=[DataRequired()]
    )
    city = StringField(
        'City',
        validators=[
            Length(max=100, message="City name must not exceed 100 characters.")
        ]
    )
    state = StringField(
        'State',
        validators=[
            Length(max=100, message="State name must not exceed 100 characters.")
        ]
    )