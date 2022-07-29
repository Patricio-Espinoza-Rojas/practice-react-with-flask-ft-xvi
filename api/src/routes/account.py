from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Profile

account = Blueprint('account', __name__)

@account.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    id = get_jwt_identity()
    user = User.query.get(id)
    data = {
        "user": user.serialize()
    }
    return jsonify({ "status": "success", "message": "Profile loaded", "data": data }), 200


@account.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    id = get_jwt_identity()
    user = User.query.get(id)

    email = request.json.get('email')
    password = request.json.get('password', "")

    name = request.json.get('name', '')
    biography = request.json.get('biography', '')

    if not email: return jsonify({ "status": "failed", "message": "Email is required", "data": None }), 400
    #if not password: return jsonify({ "status": "failed", "message": "Password is required", "data": None }), 400

    #userFound = User.query.filter_by(email=email).first()
    #if userFound and userFound.id != id: return jsonify({ "status": "failed", "message": "Email already exists", "data": None }), 400

    if password != "":
        user.password = generate_password_hash(password)

    user.email = email
    user.profile.name = name
    user.profile.biography = biography
    user.update()

    data = {
        "user": user.serialize()
    }
    return jsonify({ "status": "success", "message": "Profile loaded", "data": data }), 200

