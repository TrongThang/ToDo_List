from sqlalchemy import Column, Integer
from todo_app import db

class BaseModel(db.Model):
    __abstract__ = True
    id = Column(Integer, primary_key=True, autoincrement=True)