from sqlalchemy import Column, String, DateTime, Boolean, Integer, ForeignKey
from datetime import datetime
from sqlalchemy.orm import relationship
from todo_app.models.BaseModel import BaseModel

class ToDo(BaseModel):
    __tablename__ = 'todo'

    title = Column(String(100), nullable=False)
    content = Column(String(255))
    deadline = Column(DateTime)
    created_date = Column(DateTime, default=datetime.now())
    active = Column(Boolean, default=True)
    category_id = Column(Integer, ForeignKey('category.id'))
    category = relationship('Category', back_populates='todo_list')

    def __str__(self):
        return self.title

