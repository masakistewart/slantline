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
    # 'cnn': "http://rss.cnn.com/rss/cnn_world.rss",
    'guardian': "http://www.theguardian.com/world/rss",
    # 'fox': "http://feeds.foxnews.com/foxnews/world",
    'huffingtonpost': "http://www.huffingtonpost.com/feeds/index.xml",
    'nytimes': "http://rss.nytimes.com/services/xml/rss/nyt/World.xml"
}


def getAll(array):
    allTheNews = []
    for key in newsFeeds:
        subList = getHeadlines(key)
        for item in subList:
            allTheNews.append(item)
    return allTheNews

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
    try:
        conn = psycopg2.connect("dbname=NEWS_DB user=masakistewart")
    except:
        print("I am unable to connect to the database")
    con= conn.cursor()
    for item in arr:
        sql = "INSERT INTO news (title, summary, source, link) VALUES (%s, %s, %s, %s);"
        data = (item["title"], item["summary"], item["source"], item["link"])
        con.execute(sql, data)
    print("done")
    conn.commit()
    con.close()
    conn.close()

def getDbEntries(tableName):
    try:
        conn = psycopg2.connect("dbname=NEWS_DB user=masakistewart")
        print('connected')
        curs = conn.cursor()
        sql = "SELECT title FROM {0};".format(tableName)
        curs.execute(sql)
        items = curs.fetchall()
        conn.commit()
        curs.close()
        conn.close()
        print(items)
        return items
    except:
        print("I am unable to connect to the database")


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
            # print("entry exists")
        except:
            unique.append(headline)
            counter += 1
            insertIntoNewsTable(unique)


addIfDoesNotExist("news")
