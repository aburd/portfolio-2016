// General Router Libs
var express = require('express');
var router = express.Router();
// To talk to database
var mongoose = require('mongoose')
var Work = require('../models/works.js')
mongoose.Promise = require('bluebird')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'aburd\'s Portfolio | aburdのポートフォリオ'
  });
});

/*
/ GET all works
*/
router.get('/works', function(req, res, next) {
	mongoose.connect('mongodb://aburd:Cloudsong1@127.0.0.1/portfolio')
	var db = mongoose.connection

	db.on('error', console.error.bind(console, "Error connecting to DB: "))
	db.once('open', function(){
		var query = Work.find({}).exec()
			query
				.then((works) => {
					var filteredWorks = works.map((work) => {
						return {
							name: work.name,
							url: work.url,
							agency: work.agency,
							cover: work.screenshots[0]
						}
					})
					res.render('works.hbs', {
						title: 'aburd\'s Works | aburdの業歴',
						pageTitle: 'i powerbomb html and elbow-drop js',
						works: filteredWorks,
						layout: 'layout-sub-page'
					})
					db.close()
				})
	})
})

/*
/ GET individual works
*/
router.get('/works/:name', function(req, res, next) {
	mongoose.connect('mongodb://aburd:Cloudsong1@127.0.0.1/portfolio')
	var db = mongoose.connection

	db.on('error', console.error.bind(console, "Error connecting to DB: "))
	db.once('open', function(){
		var query = Work.findOne({ url: req.params.name }).exec()
			query
				.then((work) => {
					if(work){
						res.render('work.hbs', {
							title: 'a work by aburd | aburdの業歴',
							pageTitle: 'i powerbomb html and elbow-drop js',
							work: work,
							layout: 'layout-sub-page'
						})
					} else {
						res.status(404);
					  res.render('error', {
					    message: "We ain't got that page.",
					    error: {
					    	status: 404
					    }
					  });
					}
					db.close()
				})
	})
})


// RESTful stuff for works
router.get('/data/:name', function(req, res, next) {
	mongoose.connect('mongodb://aburd:Cloudsong1@127.0.0.1/portfolio')
	var db = mongoose.connection

	db.on('error', console.error.bind(console, "Error connecting to DB: "))
	db.once('open', function(){
		switch(req.params.name) {
			// Query all works
			case "all":
				var query = Work.find({}).exec()
				query
					.then((works) => {
						res.json(works)
						db.close()
					})
			// Just get a list of names
			case "name-list":
				var query = Work.find({}).exec()
				query
					.map( work => work.name )
					.then((names) => {
						res.json(names)
						db.close()
					})
			// Query a specific work
			default:
				var query = Work.findOne({url: req.params.name}).exec()
				query.then((work) => {
					res.json(work)
					db.close()
				})
		}
	})

})

router.get('/test', function(req, res, next) {
	res.render('index', { title: 'A Test', layout: 'layout-test' })
})

module.exports = router;