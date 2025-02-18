from sqlalchemy import Column, String, Boolean
from sqlalchemy.orm import relationship

from todo_app.models.BaseModel import BaseModel

class Category(BaseModel):
    __tablename__ ='category'
    name = Column(String(255), nullable=False)
    todo_list = relationship('ToDo', back_populates='category', lazy=True)

    def __str__(self):
        return self.name