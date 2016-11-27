'use strict'

var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path')
var Work = require('./works.js')
mongoose.connect('mongodb://aburd:Cloudsong1@127.0.0.1/portfolio')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))


db.once('open', function(){
	// get info from json
	var worksPath = path.join(__dirname, "..", "public", "images", "images.json")
	var worksData = JSON.parse(fs.readFileSync(worksPath))

	worksData.forEach(( work ) => {
		var theWork = new Work(work)
		theWork.save((err, theWork) => {
			if(err) return console.error("err: " +  err)
			console.log(theWork.sayMyName())
		})

	})

})

