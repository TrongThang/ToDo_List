from flask_restful import Resource
from flask import request, jsonify
from todo_app.services.userService import *

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['username']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

class LoginController(Resource):
    def post(seft):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        result = login(username=username, password=password)

        return result
    
class RegisterController(Resource):
    def post(seft):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        result = register(username=username, password=password)

        return result