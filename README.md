#A NEWS service built with:
NodeJS/ExpressJS - PostgreSQL - Python - Angular
-

NEWS is my capstone project for Galvanize's full stack web development  immersive program. It was completed in 2 weeks. Everything from the idea itself and all the subsequent code that followed.

One of the aspects that I enjoyed most about building this project was teaching myself to write Python. It's an amazing language to program in. Everything from syntax, the look, the data proccessing capabilities all make Python a contender for my top coding language.

Another area I particularly enjoyed was building the API to recieve data from the Python Code and have it work with an ExpressJS server as well as a PostgreSQL database. When I got everything up and running I had this amazing feeling that I had created a fully functioning ecosystem. My app felt alive.

-

To get NEWS up and running:

1.

	$ npm install
	
2.

	createdb NEWS_DB
3.

	$ knex migrate:latest
	
4.

	$ pip3 install requests psycopg2 feedparser
5.

	$ node app.js



####Features
- A full text search engine. No simple string matching, all thanks to PostgreSQL's built in data types ts_vectory and ts_query. 
- Authentication with JSON WEB TOKENS + AngularJS 1.5 + nodejs
- Favoriting news articles
- An API running on Express that interfaces with a python web scraper and postgreSQL database


###BUGS

- There is a slight race condition when logging in. Because of the server-side and front-end Authentication processes the login section is left waiting for a token. When there is no token the page assumes that the user is not logged in and displays an error message
- The full text search takes time to run its many processes and find the right articles. When there are 18,000+ articles in the database the lag can be upwards of 5 seconds.
- Search bar is glitched up...

		By Cairo Stewart





