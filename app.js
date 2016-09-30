// DEV MODULES
var express 				= require('express');
var app 					= express();
var port 					= process.env.PORT || 8000;
var knex 					= require('./db/knex.js');
var apiRoutes 				= require('./routes/apiRoutes.js');
var angularRoutes			= require('./routes/angularRoutes.js');
var authRoutes 				= require('./routes/auth.js');
var cors 					= require('cors');

// MIDDLEWARE MODULES
var morgan				= require('morgan');
var bodyParser		= require('body-parser');

// Load env file
require('dotenv').load();

// MIDDLEWARE Initiation
app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));
app.use(bodyParser.json());

// ROUTING
app.use('/', angularRoutes);
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Listening on either the environment port or localhost:8000
app.listen(port, function() {
	console.log("listening on port " + port);
});