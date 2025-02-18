import  jwt
import datetime
from flask import request, jsonify, make_response
from todo_app import app,db
from functools import wraps

def create_token(username):
    token = jwt.encode(
        {
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)  # Token hết hạn sau 30 phút
        },
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )
    return token

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # Xác thực token
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['username']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated

def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('passwork')

    if not request or not password:
        return jsonify({'message': 'Tài khoản hoặc mật khẩu không chinnh xác'})

    # if username not in