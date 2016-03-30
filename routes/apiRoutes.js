var express 		= require('express');
var router 			= express.Router();
var knex 				= require('../db/knex.js');
var pythonShell	= require('python-shell');
var pg 					= require('pg');
var atob 				= require('atob');
var multiline 	= require('multiline');


function parseToken(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(atob(base64));
}


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
	if(req.headers.authorization) {
		knex.select('title', 'summary', 'source', 'created_at').from('news').then(function(data) {
			res.setHeader('Content-Type', 'application/json');
			res.json(data);
		});
	} else {
		res.json({err: 'not logged in'});
	}
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
								knex('news').count('title').then(function(count) {
									var formattedArr = []
									var arr = [data1,data2,data3,data4,data5,data6,data7]
									var dataArr = [arr, count];

									for (var i = 0; i < dataArr[0].length; i++) {
										var item = {}
										item.sentence = ""
										for (var j = 0; j < dataArr[0][j].length; j++) {
											item.sentence += dataArr[0][i][j].title + " - " + dataArr[0][i][j].created_at + " - ";
											item.source = dataArr[0][i][j].source
										}
										formattedArr.push(item);
									}
									res.json([formattedArr, count]);
								});
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


router.get('/addFavorites/:id',function(req,res) {
	var newsId = req.params.id;
	var favorited_at = Date.now();
	var token = req.headers.authorization
	var user = parseToken(token)
	if(token && newsId) {
		knex('favorites').where({user_id: user.id, news_id: newsId}).then(function(data) {
			if(!data[0]) {
				var token = req.headers.authorization.split(' ')[1];
	  		var user = parseToken(token);

	  		console.log(user);

	  		knex('favorites').insert({user_id: user.id, news_id: newsId}).then(function() {
	  			res.send('done')
	  		});
			} else {
				res.send({status: 404});
			}
		})
	} else {
		res.send('nopes');
	}
});


router.get('/getFavorites/:id',function(req,res) { 
  	if(req.headers.authorization) {
  		var token = req.headers.authorization.split(' ')[1];
    	var user = parseToken(token);
    	var connectionConfig = process.env.DATABASE_URL || 'postgres://localhost:5432/pythonTestDB';
  		var client = new pg.Client(connectionConfig);

  		client.connect();

  		var results = [];
  		var query = client.query("select * from favorites inner join users on users.id = favorites.user_id inner join news on favorites.news_id = news.id where users.id = " + user.id + ";");

  		query.on('row', function(row) {
  	    results.push(row);
  	  });

  		query.on('end', function() {
  			res.json(results);
  			client.end();
  		});
  	}
});


router.delete('/removeFav/:id',function(req,res) { 
  var token = req.headers.authorization
  var user_id = parseToken(token).id;
  var fav_id = req.params.id;
  console.log(fav_id)
  knex('favorites').where({favorites_id: fav_id}).del().then(function(data) {
  	console.log(data);
  	res.send(data)
  }).catch(function(data) {
  	console.log(data);
  	res.send(data);
  })
});


router.get('/recentNewsStories',function(req,res) {
	console.log(req.headers.authorization)
	if(req.headers.authorization) {
		knex.select("*").from("news").where('source', "=", "guardian").orderBy('created_at', 'desc').then(function(data1) {
	  	knex.select("*").from("news").where('source', "=", "fox").orderBy('created_at', 'desc').then(function(data2) {
	  		knex.select("*").from("news").where('source', "=", "nytimes").orderBy('created_at', 'desc').then(function(data3) {
	  			knex.select("*").from("news").where('source', "=", "huffingtonpost").orderBy('created_at', 'desc').then(function(data4) {
	  				knex.select("*").from("news").where('source', "=", "cnn").orderBy('created_at', 'desc').then(function(data5) {
	  					knex.select("*").from("news").where('source', "=", "aljazeera").orderBy('created_at', 'desc').then(function(data6) {
	  						knex.select("*").from("news").where('source', "=", "reuters").orderBy('created_at', 'desc').then(function(data7) {
		  						res.setHeader('Content-Type', "application/json");
		  						var dataArr = [data1,data2,data3,data4,data5,data6,data7];
		  						res.json(dataArr);
		  					});
	  					});
	  				});
	  			});
	  		});
	  	});
	  });
	} else {
		res.json({err: 'Not Logged In'})
	}
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
 	//  knex('news').insert(req.body).then(function() {
 	//  	console.log("added")
 	//  })
 console.log(req.body);
});


router.get('/search/:words',function(req,res) {
	var word = req.params.words.replace(/['20%' ]/g, " ")
	ts_news(word, res)
 });


router.put('/updateNews/:id/:passcode',function(req,res) {

});


module.exports = router;