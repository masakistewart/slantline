from bs4 import BeautifulSoup
import feedparser
# import requests

# --------------------------------------------- old code ----------------------------------------------
# abcRaw = requests.get("feed://www.foods.abcnews.go.com/abcnews/internationalheadlines")
# abcSoup = BeautifulSoup(abcRaw.content, "html5lib")
# headlines = abcSoup.find_all("div", {"class": "h"})
# count = 0
# for headline in headlines:
#     count+=1
#     print(count, headline.text)


def getAbcHeadlines():
	things = feedparser.parse("feed://feeds.abcnews.com/abcnews/internationalheadlines")
	items = things["items"]
	abcHeadlines = []
	for item in items:
	    abcHeadlines.append(item["title"], item["summary"])
	return abcHeadlines
