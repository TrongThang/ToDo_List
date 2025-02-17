from todo_app import *
from todo_app.models.Category import Category
from todo_app.models.ToDo import ToDo
from datetime import datetime

#TO DO
def get_list_todo(cate_id = None):
    list_todo = None
    if cate_id:
        list_todo = db.session.execute(db.select(ToDo).filter_by(category_id = cate_id).order_by(ToDo.created_date)).scalars().all()
    else:
        list_todo = db.session.execute(db.select(ToDo).order_by(ToDo.created_date)).scalars().all()

    return [
        {
            "id": todo.id,
            "title": todo.title,
            "content": todo.content,
            "created_date": todo.created_date,
            "active": todo.active,
            "category_id": todo.category_id
        }
        for todo in list_todo
    ]

def add_todo(todo:ToDo):
    if not todo.category_id:
        return { "title": todo.title, "deadline":todo.deadline, "message": "Danh mục cho đầu việc là bắt buộc" }
    new_todo = db.session.add(todo)
    db.session.commit()

    return {
        "id": todo.id,
        "title": todo.title,
        "content": todo.content,
        "deadline": todo.deadline.strptime(datetime, "%d%m%y%H%M%S"),
        "active": todo.active,
        "category": todo.category_id
    }

def update_todo(todo_updated: ToDo):
    todo = ToDo.query.get(todo_updated.id)
    time_accept = True
    if todo_updated.deadline:
        time_accept = todo_updated.deadline > datetime.now()

    message = "Cập nhật thành công!"
    if not todo:
        message = "Không tồn tại công việc này"
        return message
    if not time_accept:
        message = "Deadline phải lớn hơn ngày giờ hiện tại"
        return message

    if todo_updated.title and todo_updated.title != '':
        todo.title = todo_updated.title
    if todo_updated.content and todo_updated.content != '':
        todo.content = todo_updated.content
    if todo_updated.deadline and todo_updated.deadline != '':
        todo.deadline = todo_updated.deadline
    if todo_updated.active:
        todo.active = todo_updated.active
    if todo_updated.category_id and todo_updated.category_id != '':
        todo.category_id = todo_updated.category_id

    db.session.commit()

    return {
        "data": {
            "id": todo.id,
            "title": todo.title,
            "content": todo.content,
            "deadline": todo.deadline,
            "active": todo.active,
            "category": todo.category_id
        },
        message: message
    }

def del_todo(todo_id):
    todo = ToDo.query.get(todo_id)

    db.session.delete(todo)
    db.session.commit()
    return True