from flask_restful import Api

from todo_app.controllers.categoryController import CategoryController
from todo_app.controllers.todoController import ToDoController
from todo_app import *

api = Api(app)



api.add_resource(ToDoController, "/todo")
api.add_resource(CategoryController, "/category")

if __name__ == '__main__':
    app.run(debug=True)