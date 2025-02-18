from sqlalchemy import Column, String, Boolean, DateTime
from datetime import datetime
from todo_app.models.BaseModel import BaseModel
from todo_app import app, db

class User(BaseModel):
    __tablename__ = 'user'
    username = Column(String(50), nullable=False)
    password = Column(String(255), nullable=False)
    created_date = Column(DateTime, default=datetime.now())
    active = Column(Boolean, default=True)

    def __str__(self):
        return self.username

with app.app_context():
    db.create_all()