from bs4 import BeautifulSoup
import requests
import feedparser

def getHeadlines():
	newsFeeds = {
		aljazeera: 'http://america.aljazeera.com/content/ajam/articles.rss',
		cnn: "http://rss.cnn.com/rss/cnn_world.rss",
		guardian: "http://www.theguardian.com/world/rss",
		fox: "http://feeds.foxnews.com/foxnews/world",
		huffingtonpost: "http://feeds.huffingtonpost.com/c/35496/f/677102/index.rss",
		nytimes: "http://rss.nytimes.com/services/xml/rss/nyt/World.xml"
	}
	target = newsFeeds[newsOutlet]
	feeds = feedparser.parse(target)
	for feed in feeds["items"]:
		print(feed["title"], feed['summary'])


