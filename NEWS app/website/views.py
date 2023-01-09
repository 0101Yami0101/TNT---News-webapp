from flask import Blueprint, render_template, redirect, jsonify, flash, request
from .news import NewsData
from .crypto import cryptoData
from flask_login import current_user, login_required
from . import db
from .models import User, News




views = Blueprint('views', __name__)


#getting back news data with default keyword
news = NewsData(key_word= 'Technology')
default_news_list = news.final_data  

##getting back news data with blockchain keyword
blockchain_news =  NewsData(key_word="Blockchain")
blockchain_news_list = blockchain_news.final_data


@views.route('/', methods= ['GET'])     
def home():
    # cryptodata  
    c = cryptoData()
    crypto_list = c.assets_list
    crypto_names_list = c.asset_names_list

    

    #headline list for marquee
    marquee_list = [] 
    for i in range(len(default_news_list)):
        marquee_list.append(default_news_list[i]['title'])
    for i in range(len(blockchain_news_list)):
        marquee_list.append(blockchain_news_list[i]['title'])

    return render_template("home.html", news_list = default_news_list, blockchain_list = blockchain_news_list, marquee_list = marquee_list, crypto_list= crypto_list, names_list= crypto_names_list , user = current_user)





@views.route("/loadmore/general") #route to send data to frontend for dom manipulation
def load_more_general():
    
    global default_news_list, blockchain_news_list
    data = {"def-data" : default_news_list,
            "block-data": blockchain_news_list,
            "status" : "success"}  


    return jsonify(data)






@views.route('/readmore/<section>/<article_id>', methods= ['GET'])     
def readMore(section, article_id):

    #scrape data from news_api provided link
    # requests.get(url= default_news_list[id]['link'])

    id = int(article_id)
    if section == "def" :
        the_content = default_news_list[id]['content']
    else:
        the_content = blockchain_news_list[id]['content']
    
    return render_template('readmore.html', content= the_content)


    


@views.route('/AddToReadlater', methods = ['POST'])
@login_required
def readlater():
    if request.method == 'POST':
        data = str(request.get_data()) #recieved data is in bit format so converting it
        print(data)


    return jsonify({"status" : "success"})