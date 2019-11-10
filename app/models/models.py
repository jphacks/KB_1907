from database import db
from sqlalchemy import Column, Integer, Unicode, DATETIME, JSON, ForeignKey
from sqlalchemy.orm import relationship, backref
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Unicode(20), unique=True, nullable=False)
    password = Column(Unicode(20), nullable=False)
    registerd_at = Column(DATETIME, default=datetime.now, nullable=False)

    def __init__(name, password, registerd_at):
        self.name = name.title()
        self.password = password.title()
        self.registerd_at = registerd_at.title()

class Log(db.Model):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    topic = Column(JSON, nullable=False)
    posession = Column(JSON, nullable=False)
    active_rate = Column(Integer, nullable=False)
    score = Column(JSON, nullable=False)
    total_time = Column(Integer, nullable=False)
    created_at = Column(DATETIME, default=datetime.now, nullable=False)
    
    def __init__(user_id, topic, posession, active_rate, score, total_time, created_at):
        self.user_id = user_id.title()
        self.topic = topic.title()
        self.posession = posession.title()
        self.active_rate = active_rate.title()
        self.score = score.title()
        self.total_time = total_time.title()
        self.created_at = created_at.title()
