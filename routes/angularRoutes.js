var express = require('express');
var router 	= express.Router();
var knex 	= require('../db/knex.js');
var path 	= require('path')


router.get('/',function(req,res) {
  res.sendFile(path.join(__dirname, '../client/views/', 'index.html'));
 });


module.exports = router;