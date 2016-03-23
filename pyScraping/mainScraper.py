from bs4 import BeautifulSoup
import requests
import feedparser


def cleanhtml(raw_html):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext


newsFeeds = {
    'aljazeera': 'http://america.aljazeera.com/content/ajam/articles.rss',
    'cnn': "http://rss.cnn.com/rss/cnn_world.rss",
    'guardian': "http://www.theguardian.com/world/rss",
    'fox': "http://feeds.foxnews.com/foxnews/world",
    'huffingtonpost': "http://feeds.huffingtonpost.com/c/35496/f/677102/index.rss",
    'nytimes': "http://rss.nytimes.com/services/xml/rss/nyt/World.xml"
}


def getAll(array):
    allTheNews = []
    for key in newsFeeds:
        subList = getHeadlines(key)
        for item in subList:
            allTheNews.append(item)
    return allTheNews


def forFox(data):
    return data[0]["feedburner_origlink"]


def getHeadlines(name):
    target = newsFeeds[name]
    feeds = feedparser.parse(target)["items"]
    print(forFox(feeds))
    finalArray = []
    for feed in feeds:
        tmpObj = {
            "title": feed["title"],
            "summary": cleanhtml(feed["summary"]),
            "source": name,
            "links": newsFeeds[name]
        }
        finalArray.append(tmpObj)
    return finalArray


getHeadlines("fox")
