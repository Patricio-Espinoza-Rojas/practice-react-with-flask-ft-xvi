import datetime
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token
from models import User, Profile
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email: return jsonify({ "status": "failed", "message": "Email is required", "data": None }), 400
    if not password: return jsonify({ "status": "failed", "message": "Password is required", "data": None }), 400
    
    userExits = User.query.filter_by(email=email).first()
    if not userExits: return jsonify({ "status": "failed", "message": "Email/Password are incorrects", "data": None }), 401
    if not check_password_hash(userExits.password, password): return jsonify({ "status": "failed", "message": "Email/Password are incorrects", "data": None }), 401

    expires = datetime.timedelta(days=1)

    acces_token = create_access_token(identity=userExits.id, expires_delta=expires)

    data = {
        "access_token": acces_token,
        "user": userExits.serialize()
    }

    return jsonify({ "status": "success", "message": "Login successfully", "data": data }), 200

@auth.route('/register', methods=['POST'])
def register():

    email = request.json.get('email')
    password = request.json.get('password')

    name = request.json.get('name', '')
    biography = request.json.get('biography', '')

    if not email: return jsonify({ "status": "failed", "message": "Email is required", "data": None }), 400
    if not password: return jsonify({ "status": "failed", "message": "Password is required", "data": None }), 400
    
    userFound = User.query.filter_by(email=email).first()
    if userFound: return jsonify({ "status": "failed", "message": "User already exists", "data": None }), 400

    user = User()
    user.email = email
    user.password = generate_password_hash(password)

    profile = Profile()
    profile.name = name
    profile.biography = biography

    user.profile = profile
    user.save()

    if user: return jsonify({ "status": "success", "message": "Register successfully, please login", "data": None }), 200
    else: return jsonify({ "status": "failed", "message": "Error in register, please try again", "data": None }), 200