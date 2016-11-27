'use strict'

var fs = require('fs')
var path = require('path')

var writable = fs.createWriteStream(path.join(__dirname, 'images.json'))

fs.readdir(__dirname, function(err, files){
	var res = [];
	var folders = files.filter( file => !file.includes(".") )
	// Go through each folder
	folders.forEach((folder) => {
		var screensPath = path.join(__dirname, folder)
		var screens = fs.readdirSync(screensPath)
			.filter( file => file.includes(".png"))
			.map( file => folder + "/" + file )

		var work = {}		

		var name = folder.split("-")
			.map( word => word.slice(0,1).toUpperCase() + word.slice(1) )
			.join(" ")

		work["name"] = name
		work["url"] = folder
		work["description"] = ""
		work["agency"] = "Servcorp"
		work["date"] = new Date()
		work["screenshots"] = screens
		work["tags"] = ["UI", "landing page"]
		
		res.push(work)
	})

	writable.write(JSON.stringify(res))
})