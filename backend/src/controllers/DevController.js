const Dev = require('../models/Dev')

module.exports = {
	async index(req, res) {
		const devs = await Dev.find().sort('name')

        return res.json(devs)
	},

	async store(req, res) {
		const { login, name, bio, location, html_url } = req.body

		const dev = await Dev.create({
			login,
			name,
			bio,
			location,
			html_url
		})

		return res.json(dev)
	}
}