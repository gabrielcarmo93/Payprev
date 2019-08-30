const mongoose = require('mongoose')

const DevSchema = new mongoose.Schema(
	{
		login: String,
		name: String,
		bio: String,
		location: String,
		html_url: String
	}
)
module.exports = mongoose.model('Dev', DevSchema)