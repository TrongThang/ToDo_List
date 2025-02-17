#CATEGORY
from sqlalchemy import func
from todo_app.models.Category import Category
from todo_app import db

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


def update_categories(cate_id, name):
    cate = Category.query.get(cate_id)

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
    print(cate_id)
    cate = Category.query.get(cate_id)
    if not cate:
        message = "Không tìm thấy danh mục yêu cầu"
        return message

    db.session.delete(cate)
    db.session.commit()
    return True
