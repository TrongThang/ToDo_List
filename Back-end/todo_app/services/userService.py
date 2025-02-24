# from datetime import datetime, timedelta
import datetime
from flask import request, jsonify, make_response
from todo_app import app,db
from functools import wraps
from todo_app.models.User import User
import bcrypt
import jwt

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

def login(username, password):
    print('login', username, password)
    if password is None:
        return jsonify({'message': 'Tài khoản hoặc mật khẩu không chinnh xác', 'success': False})

    users = User.query.get(username)

    if not username or not users:
        return jsonify({'message': 'Không tìm tên tài khoản người dùng', 'success': False})
    
    if bcrypt.checkpw(password.encode('utf-8'), users.password.encode('utf-8')):
        token = create_token(username)
        return jsonify({'token': token, 'success': True})
    else:
        return jsonify({'message':'Mật khẩu không chính xác', 'success': False})

def register(username, password):
    if password is None:
        return jsonify({'message':'Mật khẩu là bắt buộc', 'success': False})
    if username is None or username == '':
        return jsonify({'message':'Tên tài khoản là bắt buộc', 'success': False})
    
    user = User.query.get(username)
    if user:
        return jsonify({'message':'Tên tài khoản đã tồn tại!', 'success':False})
    else:
        salt = bcrypt.gensalt()  # Tạo salt (tự động chọn độ mạnh)
        password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
        newUser = User(username=username, password=password_hash.decode('utf-8'))
        db.session.add(newUser)
        db.session.commit()

        return jsonify({'message':'Tạo tài khoản thành công!', 'success':True})