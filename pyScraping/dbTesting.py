import psycopg2
import mainScraper

def insertIntoNewsTable(array):
	try:
	    conn = psycopg2.connect("dbname=pythonTestDB user=MasakiStewart")
	except:
	    print("I am unable to connect to the database")
	con= conn.cursor()
	for item in array:
		sql = "INSERT INTO news (title, summary, source) VALUES (%s, %s, %s);"
		data = (item["title"], item["summary"], item["source"])
		con.execute(sql, data)
	print("done")
	conn.commit()
	con.close()
	conn.close()

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
	allTheNews = mainScraper.getAll(mainScraper.newsFeeds)
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

addIfDoesNotExist('news')