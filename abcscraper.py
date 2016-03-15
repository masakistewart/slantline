from bs4 import BeautifulSoup
import requests


def getAbcHeadlines():
    abcRaw = requests.get("feed://www.foods.abcnews.go.com/abcnews/internationalheadlines")
    abcSoup = BeautifulSoup(abcRaw.content, "html5lib")
    headlines = abcSoup.find_all("div", {"class": "h"})
    count = 0
    for headline in headlines:
        count+=1
        print(count, headline.text)
import feedparser

things = feedparser.parse("feed://feeds.abcnews.com/abcnews/internationalheadlines")
items = things["items"]
for item in items:
    print(item["title"],item["summary"], "\n\n", sep=":")
