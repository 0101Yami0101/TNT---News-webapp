# Authentication endpoints
from flask import Blueprint, render_template, flash, request, redirect
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash 
from . import db
from flask_login import current_user, login_user, logout_user

auth = Blueprint('auth', __name__)


@auth.route('/sign-up', methods= ['GET', 'POST'])
def signUp():

    if request.method == 'POST': #get form inputs
        email = request.form.get('email')
        user_name = request.form.get('userName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        # validating email
        user = User.query.filter_by(email= email).first()


        if user:
            flash("Email Already Exists!!, Kindly Login", category='error')
            return redirect('/log-in')
        elif len(email) < 4:
            flash('Email Must Be Greater Than 3 Characters', category= 'error')
        elif len(user_name) < 2:
            flash('First Name Must Be Greater Than 1 Characters', category= 'error')
        elif password1 != password2:
            flash('Passwords does not match', category= 'error')
        elif len(password1) < 7:
            flash('Password must be atleast 7 characters', category= 'error')
        else:
            # Adding new user data to database
            new_user = User(email= email, user_name = user_name, password = generate_password_hash(password1, method="sha256"))
            try:
                db.session.add(new_user)
                db.session.commit()
        
                
                print("Data is added")          
                return render_template('/log-in')
            except:
                print("Error 404")
    



    return render_template('signup.html',  user= current_user )





@auth.route('/log-in', methods= ['GET', 'POST'])
def login():

    if request.method == 'POST':
        email= request.form.get('email')
        password = request.form.get('password')

        
        #   todo 
        # NEED TO MAKE CHANGES
        # password validation error
        # multiple flashes error

        user = User.query.filter_by(email= email).first() #check if user email exists in database

        if user:
            if password == None or password == "":
                flash('Kindly enter the registered password and email')
            
            if check_password_hash(user.password, password):
                flash("Logged in successfully", category= 'success')
                # if hash matches remember current user object as current user
                login_user(user, remember= True )
                return redirect('/')
            else:
                flash("Incorrect Password, try again", category= 'error')
        else:
            flash("No such Email. Kindly signup")

    return render_template('login.html', user= current_user)




@auth.route('/log-out')
def logout():
    #deactivating "activate_key"
    current_user.activate_key = False
    db.session.commit()


    flash("Logged Out Sucessfully", category= 'success')
    logout_user() #logs out the current user/ forgetting current user
    return redirect('/')