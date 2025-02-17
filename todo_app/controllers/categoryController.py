from flasgger import swag_from
from flask import request, jsonify
from flask_restful import Resource
from todo_app.services.categoryService import *

class CategoryController(Resource):
    @swag_from('docs/category/get_category.yaml')
    def get(self):
        kw = request.args.get("kw")
        result = get_categories(kw)
        return jsonify(result)

    @swag_from('docs/category/add_category.yaml')
    def post(self):
        name = request.form.get('name')
        result = add_categories(name)
        return jsonify(result)

    @swag_from('docs/category/update_category.yaml')
    def put(self):
        cate_id = request.form.get('cate_id')
        name = request.form.get('name')

        result = update_categories(cate_id, name)
        return jsonify(result)
    @swag_from('docs/category/delete_category.yaml')
    def delete(self):
        cate_id = request.args.get('cate_id')

        result = delete_categories(cate_id)
        return jsonify(result)