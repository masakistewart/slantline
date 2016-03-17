import psycopg2
from abcscraper import getAbcHeadlines
headlines = getAbcHeadlines()




def insertData(array):
	try:
	    conn = psycopg2.connect("dbname=pythonTestDB user=MasakiStewart")
	except:
	    print("I am unable to connect to the database")
	con= conn.cursor()
	for item in array:
		sql = "INSERT INTO abcnews (title) VALUES (%s);"
		data = (item,)
		con.execute(sql, data)
	conn.commit()
	con.close()
	conn.close()

def getDbEntries(tableName,fields):
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

def addIfDoesNotExist(getDbData, getHeadlines, tableName, companyName):
	dbData = getDbData()
	headlines = getHeadlines()
	middleMan = {}
	unique = []
	for entry in dbRes:
	    middleMan[entry[0]] = 0
	counter = 0
	for headline in incoming:
	    try:
	        middleMan[incoming]
	        print("entry exists")
	    except:
	        unique.append(incoming)
	        counter += 1
	print("there were", counter, "With ", unique)


print()
