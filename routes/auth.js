var express 		= require('express');
var router 			= express.Router();
var knex 				= require('../db/knex.js');
var bcrypt 			= require('bcrypt');
var jwt 				= require('jsonwebtoken');
var cors        = require('cors');
require('dotenv').load();
// Create Token Function

function createToken(user) {
	return jwt.sign({id: user.id, name: user.name}, 'TESTING');
}

router.post('/login',function(req,res) {
  console.log(req.body)
	knex('users').where({name: req.body.name}).then(function(data){
    if(data[0]){
      var pass = req.body.password;
    bcrypt.compare(pass, data[0].password, function(err, result) {
        if(result) {
          var token = createToken(data[0]);
          console.log(token);
          res.status(201).send(token);
        } else {
          res.status(400).json({message: 'wrong username or password'});
        }
      });
    } else {
      res.status(400).json({message: 'wrong username or passord'});
    }
	});
});

router.post('/signup', function(req,res) {
  if(req.body.name === "" || req.body.password.length < 3|| knex('users').where({name: req.body.name})[0]) {
  	res.json({"err": "password or name did not meet required validations"})
  } else {
  	bcrypt.genSalt(10, function(err, salt) {
  		var name = req.body.name.replace(/ /g, "");
  		bcrypt.hash(req.body.password, salt, function(err, hash) {
  			knex('users').insert({name: name, password: hash}).then(function(data){
  				knex('users').where({name: req.body.name}).then(function(data2) {
            res.send(createToken(data2[0]))
          })
  			});
  		})
  	})
  }
});


// router.get('/',function(req,res) {
// 	var name = req.params.name, password = req.params.password;
// 	console.log(req.query)
//   knex('users').where(req.query).then(function(data){
//   	console.log(data);
//   });
//  });

module.exports = router;

