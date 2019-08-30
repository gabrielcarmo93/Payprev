const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		devs: Array
	},{
		timestamps: true
	}
)

module.exports = mongoose.model('List', ListSchema)