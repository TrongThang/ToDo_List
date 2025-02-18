from xmlrpc.client import DateTime

from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from datetime import datetime
from todo_app import *


with app.app_context():
    pass
    # db.create_all()
    # c1 = Category(name="Việc nhà")
    # c2 = Category(name='Học tập')
    # c3 = Category(name='Công việc')
    #
    # db.session.add(c1)
    # db.session.add(c2)
    # db.session.add(c3)
    #
    # db.session.commit()



