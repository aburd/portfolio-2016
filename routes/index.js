// General Router Libs
var express = require('express');
var router = express.Router();
// To talk to database
var mongoose = require('mongoose')
var dbAddress = 'mongodb://aburd:Cloudsong1@127.0.0.1/portfolio'
var Work = require('../models/works.js')
var TimelineEvent = require('../models/timelineEvent.js')
mongoose.Promise = require('bluebird')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'aburd\'s Portfolio | aburdのポートフォリオ',
  	layout: 'layout'
  });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
	mongoose.connect(dbAddress)
	var db = mongoose.connection

	db.on('error', console.error.bind(console, "Error connecting to db."))
	db.once('open', function() {
		var query = TimelineEvent.find({}).exec()
		query
			.then((timelineEvents) => {
				timelineEvents.sort((event, nextEvent) => {
					return nextEvent.date.valueOf() - event.date.valueOf()
				})
				var formattedTimelineEvents = timelineEvents.map((event) => {
					var doc = event['_doc']
					return Object.assign(doc, {date: event.getFormattedDate()})
				})

				res.render('about', { 
			  	title: 'aburd\'s Portfolio | aburdのポートフォリオ',
			  	timelineEvents: formattedTimelineEvents,
			  	layout: 'layout',
			  	currentlyLearning: 'React.js'
			  });
				db.close()
			})
	})
});

/*
/ GET all works
*/
router.get('/works', function(req, res, next) {
	mongoose.connect(dbAddress)
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
						pageTitle: 'works',
						works: filteredWorks,
						layout: 'layout'
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
							title: 'a work by aburd',
							pageTitle: 'Work',
							work: work,
							layout: 'layout'
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


/*
/ GET contact page
*/
router.get('/contact', function(req,res,next){
	res.render('contact.hbs', {
		title: 'contact',
		layout: 'layout'
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