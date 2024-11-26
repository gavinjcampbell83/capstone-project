from flask_wtf import FlaskForm
from wtforms import FileField, BooleanField
from flask_wtf.file import FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class CruzImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    is_primary = BooleanField('Is Primary', default=False)