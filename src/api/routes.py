"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

@api.route('/', methods=['GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user/<email_name>', methods=['GET'])
def user(email_name):
    print(email_name)
    user = User.query.filter_by(email=email_name).first()
    return jsonify(user.serialize()), 200


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    user1 = User.query.filter_by(email=body['email']).first()
    if user1 is None:
        raise APIException('User not found', status_code=404)
    userpass = user1.check_password(body['password'])
    if userpass ==  False:
        raise APIException('Incorrect password', status_code=404)
    access_token = create_access_token(identity=user1.email)
    return jsonify({"message": True, "token": access_token}), 200 #done auth?

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    user1 = User.query.filter_by(email=body['email']).first()
    if user1 is None:
        access_token = create_access_token(identity=body['email'])
        user = User(password=body['password'], email=body['email'], is_active=True)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": True, "token": access_token}), 200 #done auth?
    return jsonify({"message": False, "token": ""}), 200 #done auth? 

# Protege una ruta con jwt_required, bloquea las peticiones
# sin un JWT válido presente.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_email = get_jwt_identity()
    
    user = User.query.filter_by(email=current_user_email).first()

    return jsonify({"message": True, "id": user.id, "username": user.email }), 200
