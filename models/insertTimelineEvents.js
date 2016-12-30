'use strict'

var mongoose = require('mongoose')
var fs = require('fs');
var path = require('path')
var timelineEvents = require('./timelineEvents.js')
var TimelineEvent = require('./timelineEvent.js')
mongoose.connect('mongodb://aburd:Cloudsong1@127.0.0.1/portfolio')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function(){
	// get info
	timelineEvents.forEach(( event, i ) => {
		var theEvent = new TimelineEvent(event)
		theEvent.save((err, theEvent) => {
			if(err) return console.error("err: " +  err)
			console.log(theEvent.getTitle())

			if(!timelineEvents[i + 1]){
				db.close()
			}
		})

	})
})

