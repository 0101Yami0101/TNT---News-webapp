from flask import Blueprint, render_template, redirect, jsonify, flash, request
from .news import NewsData
from .crypto import cryptoData
from flask_login import current_user, login_required
from . import db
from .models import User, News, PostedNews
import json
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import webbrowser
from bs4 import BeautifulSoup




views = Blueprint('views', __name__)


#getting back news data with default keyword
news = NewsData(key_word= 'Technology')
default_news_list = news.final_data  

##getting back news data with blockchain keyword
blockchain_news =  NewsData(key_word="Blockchain")
blockchain_news_list = blockchain_news.final_data

# cryptodata  
c = cryptoData()
crypto_list = c.assets_list





@views.route('/', methods= ['GET'])     
def home():
 

    #headline list for marquee
    marquee_list = [] 
    for i in range(len(default_news_list)):
        marquee_list.append(default_news_list[i]['title'])
    for i in range(len(blockchain_news_list)):
        marquee_list.append(blockchain_news_list[i]['title'])

    return render_template("home.html", news_list = default_news_list, blockchain_list = blockchain_news_list, marquee_list = marquee_list, crypto_list= crypto_list , user = current_user)




#route to send data to frontend for dom manipulation via 
@views.route("/getAlldata") 
def getAlldata():

    user = False
    
    try: #checking for active user if any
        if current_user.id is not None :  
            user = True
            # print(current_user.id, user)
    except:
        print("no user", user)
        
    global default_news_list, blockchain_news_list
    data = {"def-data" : default_news_list,
            "block-data": blockchain_news_list,
            "c-list": crypto_list,
            "user": user,
            "status" : "success"}
    # print(crypto_list[2])


    return jsonify(data)


    


@views.route('/AddToReadlater', methods = ['POST'])
@login_required
def AddToreadlater():
    
    if request.method == 'POST':
        data = request.get_data()
        newdata = data.decode('utf8') #recieved data is in bit format so converting it
        dict = json.loads(newdata)
        theId = int(dict["id"])
        # flash("Received at backend")
        

        if dict["section"] == "def":
            news = default_news_list[theId]
            thetitle = news["title"]

            dataExists = False

            for i in current_user.news: #check if the given title matches any of the title in user's list
                if str(i.title) == str(thetitle):                
                    dataExists = True

            if dataExists:
                # flash("Already Added", "error")
                return jsonify({"status" : f"Already added!" })
            else:
                title = thetitle
                author = default_news_list[theId]['author']
                blogLink = default_news_list[theId]['link']
                imgLink = default_news_list[theId]['image-link']
                user_id = current_user.id
                # add data
                news = News(title = title, author = author, blogLink = blogLink, imgLink = imgLink, user_id = user_id )
                db.session.add(news)
                db.session.commit()


                # flash("Added News To Readlater", "error")
                return jsonify({"status" : f"Added to your list." })

        elif dict["section"] == "block":
            news = blockchain_news_list[theId]
            thetitle = news["title"]
            dataExists = False

            for i in current_user.news: #check if the given title matches any of the title in user's list
                if str(i.title) == str(thetitle):                
                    dataExists = True

            if dataExists:
                return jsonify({"status" : f"Already added!" })
            else:
                title = thetitle
                author = blockchain_news_list[theId]['author']
                blogLink = blockchain_news_list[theId]['link']
                imgLink = blockchain_news_list[theId]['image-link']
                user_id = current_user.id
                news = News(title = title, author = author, blogLink = blogLink, imgLink = imgLink, user_id = user_id )
                db.session.add(news)
                db.session.commit()



            return jsonify({"status" : f"Added to your list" })

            


    return jsonify({"status" : "some error occurred"})



# view all readlaters
@views.route('/listOfReadlater')
@login_required
def listOfReadlater():
    news_list = current_user.news
    # print(news_list)
    # for i in news_list:
    #     print(i.title)

    
    return render_template('listofreadlater.html', newslist = news_list)

# remove readlater
@views.route('/removeReadlater', methods = ['POST'])
@login_required
def removeReadlater():
    if request.method == 'POST':
        data = request.get_data()
        newdata = data.decode('utf8') #recieved data is in bit format so converting it
        dict = json.loads(newdata)
        thenewsId = int(dict["newsId"])
        # remove the news corresponding to id
        try:

            news = News.query.get(thenewsId)
            db.session.delete(news)
            db.session.commit()
            
            return jsonify({"status" : "sucess" })
        except: 
           
            return jsonify({"status" : "error" })

    else:

        return render_template('listofreadlater.html')


@views.route('/share/<section>/<article_id>', methods= ['GET'])     
def Share(section, article_id): 

    print(section, article_id)

    if section == "def":#dynamically change news list based on request coming from frontend
    
        url= (default_news_list[int(article_id)]['link'])
    else:
        url = (blockchain_news_list[int(article_id)]['link'])
    

    return jsonify({
        "success": "True",
        "URL": url
        } )


@views.route('/sendPostIdea', methods=['POST'])
def receivePost():
    if request.method == 'POST':
        data = request.get_data()
        Postdata = json.loads(data.decode('utf8'))
        mail = Postdata['email']
        message = Postdata['message']

        # add data to database
        post = PostedNews(email = mail, postData = message)
        db.session.add(post)
        db.session.commit()

        return jsonify({"status" : "sucess" })
    
    return jsonify({"status" : "failed" })
    

