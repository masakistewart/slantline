// DEV MODULES
var express 			= require('express');
var app 					= express();
var port 					= process.env.PORT || 8000;
var knex 					= require('./db/knex.js');
var apiRoutes 		= require('./routes/apiRoutes.js');
var angularRoutes	= require('./routes/angularRoutes.js');
// MIDDLEWARE MODULES
var morgan				= require('morgan');
var bodyParser		= require('body-parser');
// MIDDLEWARE Initiation
app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
// ROUTING
app.use('/', angularRoutes)
app.use('/api', apiRoutes)
// Listening on either the environment port or localhost:8000
app.listen(port, function() {
	console.log("listening on port " + port)
})