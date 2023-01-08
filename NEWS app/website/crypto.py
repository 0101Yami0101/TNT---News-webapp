# Class to get cdata data using Api
import requests



class cryptoData():
    def __init__(self) :
        self.api_key = "92310BD3-E347-45BF-A8EB-D51D59A39B89"
        self.URL_endpoint = "https://rest-sandbox.coinapi.io/v1/assets" #asset data endpoint
        self.headers = {'X-CoinAPI-Key' : self.api_key}
        self.assets_list = []
        self.asset_names_list = []


        # icons -limited calls

        # request to get a list of assets
        # asset_req = requests.get(url= self.URL_endpoint, headers= self.headers)
        # data = asset_req.json()
        # print(data)
        # for i in range(33, 47):
        #     asset = data[i]
        #     self.assets_list.append(asset)

        
        # self.icons_urls = []
        # self.iconsAPI_endpoint = "https://cryptoicons.org/api/icon/" 

        # self.get_asset_names(asset_list= self.assets_list)  
        
        
    
    
    def get_asset_names(self, asset_list):
        for asset in asset_list:
            name = str(asset["asset_id"]).lower()
            self.asset_names_list.append(name)

        

        


