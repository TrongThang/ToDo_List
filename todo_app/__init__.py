from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger

app = Flask(__name__)

app.secret_key = '@@#*&Y()P2T@@#*@#$#$%^&*('
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/todo_app?charset=utf8mb4'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SWAGGER'] = {
    'title': "API To Do App",
    'uiversion': 3
}
swagger = Swagger(app)
db = SQLAlchemy(app=app)
