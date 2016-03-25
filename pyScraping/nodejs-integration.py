import requests
import feedparser
import psycopg2
import re
import json


def cleanhtml(raw_html):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext


newsFeeds = {
    'aljazeera': 'http://www.aljazeera.com/xml/rss/all.xml',
    'cnn': "http://rss.cnn.com/rss/cnn_world.rss",
    'guardian': "http://www.theguardian.com/world/rss",
    'fox': "http://feeds.foxnews.com/foxnews/world",
    'huffingtonpost': "http://feeds.huffingtonpost.com/c/35496/f/677102/index.rss",
    'nytimes': "http://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    'reuters': "http://feeds.reuters.com/Reuters/worldNews"
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
    finalArray = []
    for feed in feeds:
        tmpObj = {
            "title": feed["title"],
            "summary": cleanhtml(feed["summary"]),
            "source": name,
            "link": newsFeeds[name]
        }
        finalArray.append(tmpObj)
    return finalArray


def insertIntoNewsTable(arr):
    # print(arr)
    for item in arr:
        r = requests.post('http://localhost:8000/api/addNews', data=item)


def getDbEntries(tableName):
    try:
        conn = psycopg2.connect("dbname=pythonTestDB user=MasakiStewart")
        print('connected')
    except:
        print("I am unable to connect to the database")
    curs = conn.cursor()
    sql = "SELECT title FROM {0};".format(tableName)
    curs.execute(sql)
    items = curs.fetchall()
    return items
    conn.commit()
    curs.close()
    conn.close()


def addIfDoesNotExist(tableName):
    allTheNews = getAll(newsFeeds)
    middleMan = {}
    unique = []
    dbList = getDbEntries(tableName)
    for entry in dbList:
        middleMan[entry[0]] = 0
    counter = 0
    for headline in allTheNews:
        try:
            middleMan[headline["title"]]
            print("entry exists")
        except:
            unique.append(headline)
            counter += 1
    print(counter)
    insertIntoNewsTable(unique)


addIfDoesNotExist("news")
