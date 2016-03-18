var express = require('express');
var router 	= express.Router();
var knex 	= require('../db/knex.js');


router.get('/',function(req,res) { 
  res.send('hello')
 });


module.exports = router;