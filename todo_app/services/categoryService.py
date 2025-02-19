#CATEGORY
from pyexpat.errors import messages
from sqlalchemy import func
from todo_app.models.Category import Category
from todo_app.models.ToDo import ToDo
from todo_app import db
from sqlalchemy.orm import joinedload

def get_categories(kw = None):
    print(kw)
    if kw:
        cates = Category.query.filter(Category.name.ilike(f'%{kw}%')).all()
    else:
        cates = Category.query.all()

    return [
        {
            "id": c.id,
            "name": c.name
        }
        for c in cates
    ]

def get_one_category(id = None):
    if id is not None:
        cate = Category.query.get(id)
        return {
            "id": cate.id,
            "name": cate.name
        }
    else:
        print('Yêu cầu truyền Mã danh mục')
        return { "message": "Yêu cầu truyền Mã danh mục" }


def add_categories(name):
    if not name:
        message = "Tên danh mục là bắt buộc"
        return message

    cate_new = Category(name=name)
    db.session.add(cate_new)

    db.session.commit()

    return {
        "id": cate_new.id,
        "name": cate_new.name
    }


def update_categories(id, name):
    cate = Category.query.get(id)

    if not cate:
        message = "Không tìm thấy danh mục yêu cầu"
        return message
    if not name:
        message = "Tên danh mục là bắt buộc"
        return message

    cate.name = name
    db.session.commit()

    return {
        "id": cate.id,
        "name": cate.name
    }

def delete_categories(cate_id):
    print("cate_id:", cate_id)
    cate = Category.query.options(joinedload(Category.todo_list)).get(cate_id)

    if cate.todo_list is not None and len(cate.todo_list) > 0:
        message = "Vẫn còn ghi chú của danh mục này"
        return { "message": message, "success": False }

    if not cate:
        message = "Không tìm thấy danh mục yêu cầu"
        return { "message": message, "success": False }
    print('xoá thành công!')
    db.session.delete(cate)
    db.session.commit()
    return True
