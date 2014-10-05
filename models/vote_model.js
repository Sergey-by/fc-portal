var express = require('express');   //Express Web Server 
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs =require('fs-extra');    //File System-needed for renaming file etc

module.exports = (function() {
	return {
		showVotePage: function(req, res){
			console.log("Vote Page Requested");
		},
		uploadLogo: function(req, res){
			console.log('::info:vote_model.js:: uploading file');

			var form = new formidable.IncomingForm();
			    //Formidable uploads to operating systems tmp dir by default
		    form.uploadDir = "./public/img/vote/logo/";       //set upload directory
		    form.keepExtensions = true;     //keep file extension

		    form.parse(req, function(err, fields, files) {
		        res.writeHead(200, {'content-type': 'text/plain'});
		        res.write('received upload:\n\n');
		        console.log("form.bytesReceived");
		        //TESTING
		        console.log("file name: "+JSON.stringify(files.fileUploaded));
		        console.log("file size: "+JSON.stringify(files.fileUploaded.size));
		        console.log("file path: "+JSON.stringify(files.fileUploaded.path));
		        console.log("file name: "+JSON.stringify(files.fileUploaded.name));
		        console.log("file type: "+JSON.stringify(files.fileUploaded.type));
		        console.log("astModifiedDate: "+JSON.stringify(files.fileUploaded.lastModifiedDate));

		        //Formidable changes the name of the uploaded file
		        //Rename the file to its original name
		        fs.rename(files.fileUploaded.path, './public/img/vote/logo/'+files.fileUploaded.name, function(err) {
		        if (err){
		        	console.log(err);
		            throw err;
		        }
		          console.log('renamed complete');  
		        });
		          res.end();
		    });
		}
	}
})();


