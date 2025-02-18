from todo_app import *
from todo_app.models.Category import Category
from todo_app.models.ToDo import ToDo
from datetime import datetime
from sqlalchemy.orm import joinedload
from sqlalchemy import desc

#TO DO
"""
"""
def get_list_todo(cate_id = None):
    query = db.select(ToDo).options(joinedload(ToDo.category)).order_by(desc(ToDo.created_date))

    if cate_id:
        query = query.filter_by(category_id=cate_id)

    list_todo = db.session.execute(query).scalars().all()

    return [
        {
            "id": todo.id,
            "title": todo.title,
            "content": todo.content,
            "created_date": todo.created_date,
            "deadline": todo.deadline,
            "active": todo.active,
            "category": {
                "id": todo.category.id,
                "name": todo.category.name
            } if todo.category else None
        }
        for todo in list_todo
    ]

def get_one_todo(todo_id):
    todo = ToDo.query.options(joinedload(ToDo.category)).get(todo_id)
    if todo:
        return {
            "id": todo.id,
            "title": todo.title,
            "content": todo.content,
            "deadline": todo.deadline,
            "active": todo.active,
            "category": todo.category_id
        }

    return False

def add_todo(todo:ToDo):
    if not todo.category_id:
        return { "title": todo.title, "deadline":todo.deadline, "message": "Danh mục cho đầu việc là bắt buộc" }
    new_todo = db.session.add(todo)
    db.session.commit()

    return {
        "id": todo.id,
        "title": todo.title,
        "content": todo.content,
        "deadline": todo.deadline,
        "active": todo.active,
        "category": todo.category_id
    }

def update_todo(todo_updated: ToDo):
    todo = ToDo.query.get(todo_updated.id)
    print('cập nhật', todo_updated.id)
    print('title', todo.title)
    print('title update:', todo_updated.title)
    print('content', todo.content)
    print('content update:', todo_updated.content)
    print('deadline', todo.deadline)

    time_accept = True
    if todo_updated.deadline:
        deadline_time = datetime.strptime(todo_updated.deadline, "%Y-%m-%d %H:%M:%S")
        current_time = datetime.now()

        time_accept = deadline_time > current_time

    message = "Cập nhật thành công!"
    if todo is None:
        message = "Không tồn tại công việc này"
        return message
    if not time_accept:
        message = "Deadline phải lớn hơn ngày giờ hiện tại"
        return message

    if todo_updated.title is not None:
        todo.title = todo_updated.title
    if todo_updated.content is not None:
        todo.content = todo_updated.content
    if todo_updated.deadline is not None:
        todo.deadline = todo_updated.deadline
    if todo_updated.active is not None:
        todo.active = todo_updated.active
    if todo_updated.category_id is not None:
        todo.category_id = todo_updated.category_id

    print('sau cập nhật:', todo.active)
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
    print(todo_id)
    todo = ToDo.query.get(todo_id)
    print('todo:', todo)
    db.session.delete(todo)
    db.session.commit()

    return True