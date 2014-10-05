var express = require('express')
    , app = express()
    , vote_model = require('./models/vote_model.js')
    , ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1"
    , port = process.env.OPENSHIFT_NODEJS_PORT || 8888
    , bodyParser = require('body-parser') //connects bodyParsing middleware
	, path = require('path')     //used for file path
	, fs =require('fs-extra')    //File System-needed for renaming file etc
    , oneDay = 86400000

//app.use(express.compress());
app.use(express.static(__dirname + '/public'), { maxAge: oneDay });

app.get('/vote', function (req, res) {
  console.log('::info:: New Request - /vote');
  vote_model.showVotePage(req, res);
});
app.post('/upload_logo', function (req, res){  
	console.log('::info:app.js:: New Request - /upload');
	vote_model.uploadLogo(req, res);
});

app.listen( port, ipaddress, function() {
    console.log('Project started ' + (new Date()) + '. Listening on ', ipaddress, ':', port);
});