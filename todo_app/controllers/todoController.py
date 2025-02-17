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
        list_todo = utils.get_list_todo(cate_id)

        return jsonify(list_todo)

    @swag_from('docs/todo/add_todo.yaml')
    def post(self):
        title = request.form.get("title")

        if title == '':
            return jsonify({"message": "Tiêu đề không được bỏ trống"}), 400

        content = request.form.get("content")

        deadline_str = request.form.get("deadline")
        deadline = datetime.strptime(deadline_str, '%d/%m/%Y')

        active_str = request.form.get("active")
        active = True if (active_str == '1' or active_str.lower() == 'true') else False

        category_id = request.form.get("category_id")

        todo = ToDo(title=title, content=content, deadline=deadline, active=active, category_id=category_id)

        new_todo = utils.add_todo(todo)

        return jsonify({"data": new_todo, "success": True})

    @swag_from('docs/todo/update_todo.yaml')
    def put(self):
        todo_id = int(request.form.get("todo_id"))
        title = request.form.get("title")
        content = request.form.get("content")
        deadline_str = request.form.get("deadline")
        if not deadline_str or deadline_str == '':
            deadline = deadline_str
        else:
            deadline = datetime.strptime(deadline_str, '%d/%m/%Y%H%M%S')

        active_str = request.form.get("active")
        active = True if active_str == '1' else False
        category_id = request.form.get("category_id")

        todo = ToDo(id=todo_id, title=title, content=content, deadline=deadline, active=active, category_id=category_id)

        result = utils.update_todo(todo)

        return jsonify(result)

    @swag_from('docs/todo/delete_todo.yaml')
    def delete(self):
        todo_id = request.args.get("todo_id")

        result = utils.del_todo(todo_id)
        return jsonify(result)