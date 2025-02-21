from flasgger import swag_from
from flask import request, jsonify
from flask_restful import Resource

from todo_app.services.categoryService import *

class CategoryController(Resource):
    @swag_from('docs/category/get_category.yaml')
    def get(self):
        kw_todo = request.args.get("kw_todo")
        id = request.args.get("id")

        # if id is not None:
        #     result = get_one_category(id)
        # else:
        result = get_categories(id=id, kw_todo=kw_todo)

        return jsonify(result)

    @swag_from('docs/category/add_category.yaml')
    def post(self):
        data= request.get_json()
        name= data.get('name') if data.get('name') is None else data.get('name').strip()
        result = add_categories(name)
        return jsonify(result)

    @swag_from('docs/category/update_category.yaml')
    def put(self):
        data = request.get_json()
        name = data.get('name') if data.get('name') is None else data.get('name').strip()
        id = data.get('id')
        print('id:', id)
        print('name:', name)
        result = update_categories(id, name)
        return jsonify(result)
    @swag_from('docs/category/delete_category.yaml')
    def delete(self):
        cate_id = request.args.get('cate_id')

        result = delete_categories(cate_id)
        return jsonify(result)