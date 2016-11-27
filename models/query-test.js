'use strict'

var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path')
var Work = require('./works.js')
mongoose.Promise = require('bluebird')
// Promise.promisifyAll(mongoose)

mongoose.connect('mongodb://aburd:Cloudsong1@127.0.0.1/portfolio')

var db = mongoose.connection

db.on('error', console.error.bind(console, "Error connecting to DB: "))
db.once('open', function(){
	var query = Work.find({}).exec()
	query
		.map( work => work.name )
		.then((names) => {
			module.exports = names
			db.close()
		})
})