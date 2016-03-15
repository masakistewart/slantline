from bs4 import BeautifulSoup
import requests

def getAlHeadlines():
    alRaw = requests.get("http://www.aljazeera.com")
    alSoup = BeautifulSoup(alRaw.content, "html5lib")
    headlines = alSoup.find_all("h1")
    print(len(headlines))
    for headline in headlines:
        print(headline.text)

    
