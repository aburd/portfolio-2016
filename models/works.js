// Works Schema and Model
var mongoose = require('mongoose')

// Create Schema
var workSchema = mongoose.Schema({
	name: String,
	url: String,
	description: String,
	agency: String,
	date: Date,
	cover: String,
	screenshots: [ String ],
	tags: [ String ]
})

workSchema.methods.sayMyName = function() {
	return this.name
		? "My name is: " + this.name
		: "I don't have a name :("
}

// Create Model
var Work = mongoose.model('Work', workSchema)

module.exports = Work;