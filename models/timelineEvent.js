// timelineEvents Schema and Model
var mongoose = require('mongoose')

// Create Schema
var timelineEventSchema = mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	description: {
		type: String,
		default: 'No description given.'
	},
	place: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	endDate: Date
})

timelineEventSchema.methods.getFormattedDate = function() {
	return this.date.toLocaleDateString()
}
timelineEventSchema.methods.getTitle = function() {
	return this.name + ' - ' + this.place
}
// Create Model
var timelineEvent = mongoose.model('TimelineEvent', timelineEventSchema)

module.exports = timelineEvent;