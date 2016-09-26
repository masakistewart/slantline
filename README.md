#A news service built with:
NodeJS/ExpressJS - PostgreSQL - Python - Angular
-

NEWS is my capstone project for Galvanize's full stack web development  immersive program. It was completed in 2 weeks. Everything from the idea itself and all the subsiquent code that followed.

####
One of the aspects that I enjoyed most about building this project was teaching myself to write Python. Its an amazing language to program in. Everything from syntax, the look, the data proccessing capabilities all make Python a contender for my top coding language.


Another area I particularly enjoyed was Building the API to recieve data from the Python Code and have it work with an ExpressJS server as well as a PostgreSQL database. When I got everything up and running I had this amazing feeling that I had created a fully functioning ecosystem. My app felt alive.



####Features
- A full text search engine. No simple string matching, all thanks to PostgreSQL's built in data types ts_vectory and ts_query. 
- Authentication with JSON WEB TOKENS + AngularJS 1.5
- Favoriting news articles
- An API running on Express that interfaces with a python web scraper and postgreSQL database


###BUGS

- There is a slite race condition when logging in. Because of the server-side and front-end Authentication proccesses the login section is left waiting for a token. When there is no token the page assumes that the user is not logged in and displays an error message
- The full text search takes time to run its many proccesses and find the right articles. When there are 18,000+ articles in the database the lag can be upwards of 5 seconds.

		By Cairo Stewart





