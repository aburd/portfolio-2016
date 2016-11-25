var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port);

console.log('App listening at port', port)