from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager


db = SQLAlchemy()
DB_NAME = "database.db"

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'qwerty'

    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)


    #importing route blueprints
    from .views import views  
    from .auth import auth
    from .models import User
    

     #loginManager/ telling app to login current user
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader 
    def load_user(id):
        return User.query.get(int(id))

    app.register_blueprint(views, url_prefix = '/')
    app.register_blueprint(auth, url_prefix = '/')



     #create database

    if not path.exists('website/' + DB_NAME):
        db.create_all(app=app)
        print("Database Created")






    return app

