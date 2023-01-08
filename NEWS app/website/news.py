import requests
# Class to get news data using Api


class NewsData:
    def __init__(self, key_word : str):
        self.news_api = "https://newsapi.org/v2/everything"
        self.api_key = "0a184a5b5cf944aabfd9b94a2cb6f901" #company key/ to be saved as environment variable
        self.keyword = key_word

        self.params = {
            "apiKey" : self.api_key,
            "q" : self.keyword,

        }
        
        
        self.final_data = self.requestData(api_endpoint= self.news_api, parameters= self.params)  


    def requestData(self,api_endpoint, parameters):
        resp = requests.get(url=api_endpoint, params= parameters)
        data = resp.json()
        articles = data["articles"]
        id = 0
        article_list = []  #redesigned data

        for article in articles:  #redesigning data
            id += 1

            map = {
                "id": id, 
                "author": article["author"],
                "title": article["title"],
                "description": article["description"],
                "link" : article["url"],
                "image-link": article["urlToImage"],
                "content": article["content"],
                "published": article["publishedAt"]

            }

            article_list.append(map)
        

        return article_list




