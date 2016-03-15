from bs4 import BeautifulSoup
import requests

def getFoxHeadlines():
    foxRaw = requests.get("http://www.foxnews.com/world.html")
    foxSoup = BeautifulSoup(foxRaw.content, "html5lib")
    headlines = foxSoup.find_all("h2", {"itemprop": "headline"})
    print(len(headlines))
    count = 0
    for headline in headlines:
        count+=1
        print(count, headline.text)
