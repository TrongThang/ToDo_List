from flasgger import swag_from
from flask_restful import Resource
from flask import jsonify, request

from todo_app.utils import utils
from datetime import datetime

from todo_app.models.ToDo import ToDo

class ToDoController(Resource):
    @swag_from('docs/todo/get_todo.yaml')
    def get(self):
        cate_id = request.args.get("cate_id")
        todo_id = request.args.get("todo_id")

        if todo_id is not None:
            print("test")
            data = utils.get_one_todo(todo_id)
            return jsonify(data)

        data = utils.get_list_todo(cate_id)
        return jsonify(data)


    @swag_from('docs/todo/add_todo.yaml')
    def post(self):
        data = request.get_json()
        title = data.get("title")

        if title == '':
            return jsonify({"message": "Tiêu đề không được bỏ trống"}), 400

        content = data.get("content")
        deadline = data.get("deadline")
        active = True
        category_id = data.get("category_id")

        todo = ToDo(title=title, content=content, deadline=deadline, active=active, category_id=category_id)

        new_todo = utils.add_todo(todo)
        print("Thêm thành công!!")
        return jsonify({"data": new_todo, "success": True})

    @swag_from('docs/todo/update_todo.yaml')
    def put(self):
        data = request.get_json()

        todo_id = data.get("id")
        print('todo_id:', todo_id)
        title = data.get("title")
        content = data.get("content")
        deadline = data.get("deadline")

        active = data.get("active")
        category_id = data.get("category_id")
        todo = ToDo(id=todo_id, title=title, content=content, deadline=deadline, active=active, category_id=category_id)

        result = utils.update_todo(todo)

        return jsonify(result)

    @swag_from('docs/todo/delete_todo.yaml')
    def delete(self):
        todo_id = request.args.get("todo_id")

        result = utils.del_todo(todo_id)
        return jsonify(result)