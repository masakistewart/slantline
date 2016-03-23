var express 		= require('express');
var router 			= express.Router();
var knex 				= require('../db/knex.js');
var pythonShell	= require('python-shell');
router.get('/allNews',function(req,res) {
	knex.select('title', 'summary', 'source', 'created_at').from('news').then(function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

router.get('/recentNews', function(req, res) {
	knex.select("*").from("news").where('source', "=", "guardian").orderBy('created_at', 'desc').limit(2).then(function(data1) {
		knex.select("*").from("news").where('source', "=", "fox").orderBy('created_at', 'desc').limit(2).then(function(data2) {
			knex.select("*").from("news").where('source', "=", "nytimes").orderBy('created_at', 'desc').limit(2).then(function(data3) {
				knex.select("*").from("news").where('source', "=", "huffingtonpost").orderBy('created_at', 'desc').limit(2).then(function(data4) {
					knex.select("*").from("news").where('source', "=", "cnn").orderBy('created_at', 'desc').limit(2).then(function(data5) {
						knex.select("*").from("news").where('source', "=", "aljazeera").orderBy('created_at', 'desc').limit(2).then(function(data6) {
							res.setHeader('Content-Type', "application/json");
							res.json([data1,data2,data3,data4,data5,data6]);
						});
					});
				});
			});
		});
	});
	var options = {
  	pythonPath: '/usr/local/bin/python3',
  	scriptPath: __dirname + '/../pyScraping/'
	};
	pythonShell.run("nodejs-integration.py", options, function(err, result) {
		console.log(err, result)
	})

});

router.post('/addNews',function(req,res) { 
  if(!req.body) return res.sendStatus(400)
	res.send("thank you")
  console.log(req.body)
  knex('news').insert(req.body).then(function() {
  	console.log("added")
  })
});

router.put('/updateNews/:id/:passcode',function(req,res) { 

 });
module.exports = router;