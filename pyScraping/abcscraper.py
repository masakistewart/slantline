from bs4 import BeautifulSoup
import feedparser

def getAbcHeadlines():
	things = feedparser.parse("feed://feeds.abcnews.com/abcnews/internationalheadlines")
	items = things["items"]
	abcHeadlines = []
	for item in items:
	    abcHeadlines.append(item["title"], item["summary"])
	return abcHeadlines
