#CATEGORY
from pyexpat.errors import messages
from sqlalchemy import func
from todo_app.models.Category import Category
from todo_app.models.ToDo import ToDo
from todo_app import db
from sqlalchemy.orm import joinedload, aliased
from sqlalchemy import desc, or_

def format_datetime(value):
    """Chuyển datetime về định dạng 'YYYY-MM-DDTHH:mm' cho frontend."""
    if value:
        return value.strftime('%Y-%m-%dT%H:%M')
    return None


def get_categories(id = None, kw_todo = None):
    query  = Category.query.outerjoin(ToDo).options(joinedload(Category.todo_list))
    
    if id:
        query = query.filter(Category.id == id)

    cates = query.all()
    
    result = []
    for c in cates:
        todos = c.todo_list
        if kw_todo:
            todos = [t for t in todos if kw_todo.lower() in t.title.lower() or kw_todo.lower() in t.content.lower()]
        
        result.append({
            "id": c.id,
            "name": c.name.upper(),
            "todos": [{
                "id": t.id,
                "title": t.title,
                "content": t.content,
                "created_date": t.created_date,
                "deadline": format_datetime(t.deadline),
                "active": t.active,
                "thumbtack": t.thumbtack,
            } for t in todos]
        })  

    return result

def get_one_category(id = None, kw = None):
    query  = Category.query.options(joinedload(Category.todo_list)).order_by(desc(ToDo.created_date))

    if kw:
        query  = query.filter(Category.name.ilike(f'%{kw}%'))

    cates = query.all()
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
    print('name', name)
    if not name:
        message = "Tên danh mục là bắt buộc"
        return message
    print('sau:', name)

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
