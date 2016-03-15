from bs4 import BeautifulSoup
import requests


def getAbcHeadlines():
    abcRaw = requests.get("http://www.abcnews.go.com/international")
    abcSoup = BeautifulSoup(abcRaw.content, "html5lib")
    headlines = abcSoup.find_all("div", {"class": "h"})
    count = 0
    for headline in headlines:
        count+=1
        print(count, headline.text)
