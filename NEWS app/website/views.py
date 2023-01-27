from flask import Blueprint, render_template, redirect, jsonify, flash, request
from .news import NewsData
from .crypto import cryptoData
from flask_login import current_user, login_required
from . import db
from .models import User, News
import json
import requests
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
    
    global default_news_list, blockchain_news_list
    data = {"def-data" : default_news_list,
            "block-data": blockchain_news_list,
            "c-list": crypto_list,
            "status" : "success"}  


    return jsonify(data)


    


@views.route('/AddToReadlater', methods = ['POST'])
@login_required
def AddToreadlater():
    
    if request.method == 'POST':
        data = request.get_data()
        newdata = data.decode('utf8') #recieved data is in bit format so converting it
        dict = json.loads(newdata)
        theId = int(dict["id"])

        if dict["section"] == "def":
            news = default_news_list[theId]
            thetitle = news["title"]

            dataExists = False

            for i in current_user.news: #check if the given title matches any of the title in user's list
                if str(i.title) == str(thetitle):                
                    dataExists = True

            if dataExists:
                return jsonify({"status" : f"ALready added to ur list" })
            else:
                title = thetitle
                author = default_news_list[theId]['author']
                blogLink = default_news_list[theId]['link']
                imgLink = default_news_list[theId]['image-link']
                user_id = current_user.id
                news = News(title = title, author = author, blogLink = blogLink, imgLink = imgLink, user_id = user_id )
                db.session.add(news)
                db.session.commit()



                return jsonify({"status" : f"Added default news {theId }" })

        elif dict["section"] == "block":
            news = blockchain_news_list[theId]
            thetitle = news["title"]
            dataExists = False

            for i in current_user.news: #check if the given title matches any of the title in user's list
                if str(i.title) == str(thetitle):                
                    dataExists = True

            if dataExists:
                return jsonify({"status" : f"ALready added to ur list" })
            else:
                title = thetitle
                author = blockchain_news_list[theId]['author']
                blogLink = blockchain_news_list[theId]['link']
                imgLink = blockchain_news_list[theId]['image-link']
                user_id = current_user.id
                news = News(title = title, author = author, blogLink = blogLink, imgLink = imgLink, user_id = user_id )
                db.session.add(news)
                db.session.commit()



            return jsonify({"status" : f"Added blockchain news {theId }" })

            


    return jsonify({"status" : "some error occurred"})



# view all readlaters
@views.route('/listOfReadlater')
@login_required
def listOfReadlater():
    news_list = current_user.news
    print(news_list)
    for i in news_list:
        print(i.title)

    
    return render_template('listofreadlater.html', newslist = news_list)


@views.route('/readmore/<section>/<article_id>', methods= ['GET'])     
def readMore(section, article_id):

    #scrape data from news_api provided link
    # requests.get(url= default_news_list[id]['link'])

    id = int(article_id)
    if section == "def" :
        
        
       data = requests.get(url= default_news_list[id]['link'])
       html_content = data.text
       #process html data
       soupData = BeautifulSoup(html_content, 'html.parser')

       for i in ['header', 'footer', 'credit', 'ad']:
            
          try:
            soupData.find(i).extract()
          except:
              pass
       
       finalData = soupData.get_text()





    else:
        data = requests.get(url= blockchain_news_list[id]['link'])
        html_content = data.text
        #process html data
        soupData = BeautifulSoup(html_content, 'html.parser')
        for i in ['header', 'footer', 'credit', 'ad', 'headlines']:
          try:
            soupData.find(i).extract()
          except:
              pass
        finalData = soupData.get_text()
    
    return render_template('readmore.html', content= finalData)