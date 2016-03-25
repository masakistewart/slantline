var express 		= require('express');
var router 			= express.Router();
var knex 				= require('../db/knex.js');
var pythonShell	= require('python-shell');
var pg 					= require('pg');


function ts_news(query, res) {
	var connectionConfig = process.env.DATABASE_URL || 'postgres://localhost:5432/pythonTestDB';
	var client = new pg.Client(connectionConfig);
	client.connect();
	var results = [];
	var query = client.query("SELECT * FROM news WHERE to_tsvector(summary) @@ plainto_tsquery('" + query + "')");
	query.on('row', function(row) {
    results.push(row);
  });

	query.on('end', function() {
		res.json(results);
		client.end();
	});
}



router.get('/allNews',function(req,res) {
	knex.select('title', 'summary', 'source', 'created_at').from('news').then(function(data) {
		res.setHeader('Content-Type', 'application/json');
		res.json(data);
	});
});

router.get('/recentNews', function(req, res) {
	knex.select("title", "created_at", "source").from("news").where('source', "=", "guardian").orderBy('created_at', 'desc').limit(4).then(function(data1) {
		knex.select("title", "created_at", "source").from("news").where('source', "=", "fox").orderBy('created_at', 'desc').limit(4).then(function(data2) {
			knex.select("title", "created_at", "source").from("news").where('source', "=", "nytimes").orderBy('created_at', 'desc').limit(4).then(function(data3) {
				knex.select("title", "created_at", "source").from("news").where('source', "=", "huffingtonpost").orderBy('created_at', 'desc').limit(4).then(function(data4) {
					knex.select("title", "created_at", "source").from("news").where('source', "=", "cnn").orderBy('created_at', 'desc').limit(4).then(function(data5) {
						knex.select("title", "created_at", "source").from("news").where('source', "=", "aljazeera").orderBy('created_at', 'desc').limit(4).then(function(data6) {
							knex.select("title", "created_at", "source").from("news").where('source', "=", "reuters").orderBy('created_at', 'desc').limit(4).then(function(data7) {
								res.setHeader('Content-Type', "application/json");
								var formattedArr = []
								var dataArr = [data1,data2,data3,data4,data5,data6,data7];
								for (var i = 0; i < dataArr.length; i++) {
									var item = {}
									item.sentence = ""
									for (var j = 0; j < dataArr[j].length; j++) {
										item.sentence += dataArr[i][j].title + " - " + dataArr[i][j].created_at + " - ";
										item.source = dataArr[i][j].source
									}
									formattedArr.push(item);
								}
								res.json(formattedArr);
							});
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

router.get('/recentNewsStories',function(req,res) { 
  knex.select("*").from("news").where('source', "=", "guardian").orderBy('created_at', 'desc').then(function(data1) {
  	knex.select("*").from("news").where('source', "=", "fox").orderBy('created_at', 'desc').then(function(data2) {
  		knex.select("*").from("news").where('source', "=", "nytimes").orderBy('created_at', 'desc').then(function(data3) {
  			knex.select("*").from("news").where('source', "=", "huffingtonpost").orderBy('created_at', 'desc').then(function(data4) {
  				knex.select("*").from("news").where('source', "=", "cnn").orderBy('created_at', 'desc').then(function(data5) {
  					knex.select("*").from("news").where('source', "=", "aljazeera").orderBy('created_at', 'desc').then(function(data6) {
  						knex.select("*").from("news").where('source', "=", "reuters").orderBy('created_at', 'desc').then(function(data7) {
	  						res.setHeader('Content-Type', "application/json");
	  						var dataArr = [data1,data2,data3,data4,data5,data6,data7];
	  						res.json(dataArr)
	  					});
  					});
  				});
  			});
  		});
  	});
  });
 });

router.get('/news/:id',function(req,res) {
  knex.select('*').from('news').where('id', '=', req.params.id).then(function(data) {
  	res.json(data);
  });
});

router.get('/agency/:source',function(req,res) { 
  knex('news').count('source').where('source', '=', req.params.source).then(function(data) {
  	res.json(data)
  });
});

router.post('/addNews',function(req,res) {
  if(!req.body) return res.sendStatus(400)
	res.send("thank you")
  knex('news').insert(req.body).then(function() {
  	console.log("added")
  })
});

router.get('/search/:words',function(req,res) {
	var word = req.params.words.replace(/['20%' ]/g, " ")
	ts_news(word, res)
 });

router.put('/updateNews/:id/:passcode',function(req,res) {

 });
module.exports = router;