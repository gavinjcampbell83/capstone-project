from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, NumberRange, Length

class ReviewForm(FlaskForm):
    rating = IntegerField(
        "Rating",
        validators=[
            DataRequired(),
            NumberRange(min=1, max=5, message="Rating must be between 1 and 5.")
        ]
    )
    review_text = TextAreaField(
        "Review Text",
        validators=[
            DataRequired(),
            Length(min=10, max=500, message="Review text must be between 10 and 500 characters.")
        ]
    )