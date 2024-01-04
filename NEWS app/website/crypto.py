# Class to get cdata data using Api
import requests
import json



class cryptoData():
    def __init__(self) :
        self.api_key = "92310BD3-E347-45BF-A8EB-D51D59A39B89"
        self.URL_endpoint = "https://rest.coinapi.io/v1/assets" #asset data endpoint
        self.headers = {'X-CoinAPI-Key' : self.api_key}
        self.assets_list = []


        # request to get a list of assets
        asset_req = requests.get(url= self.URL_endpoint, headers= self.headers)
        data = asset_req.json()
        print(len(data))
        for i in range(len(data)):

            if(data[i]['type_is_crypto'] == 1): #filter only crypto type
                if('price_usd' in data[i]): #only with price
                    asset = data[i]
                    self.assets_list.append(asset)

                
        

        

    

        
        
        

        


