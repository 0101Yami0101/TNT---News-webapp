from . import db
from flask_login import UserMixin  
# Usermixin makes this user object usable with  loginmanager






class News(db.Model):
    newsId = db.Column(db.Integer, primary_key= True)
    title = db.Column(db.String(400))
    author = db.Column(db.String(50))
    blogLink = db.Column(db.String(200))
    imgLink = db.Column(db.String(200))

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))



class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key= True)
    user_name = db.Column(db.String(150))
    email = db.Column(db.String(150), unique= True)
    password = db.Column(db.String(150))
    news = db.relationship('News')


class PostedNews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150))
    postData = db.Column(db.String(1000))
