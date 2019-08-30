const List = require('../models/List')

module.exports = {
	async index(req, res) {
		const lists = await List.find().sort('name')

        return res.json(lists)
	},

	async store(req, res) {
		const { name, owner } = req.body

		await List.find({'name': name, 'owner': owner})
			.then((response)=>{
				if(response.length === 0) {
					const list = List.create({
						name,
						owner
					})

					return res.json(list)
				} else {
					res.statusMessage = 'Duplicated List name'
                	return res.status(400).send({ message: 'Lista já cadastrada'}).end()
				}
			}).catch((error)=>{
				console.log(error)
			})
	},

	async listById(req, res) {
		const { id } = req.params

		const list = List.findById(id)

		return res.json(list)
	},

	async listsByOwner(req, res) {
		const { owner } = req.params

		const lists = await List.find({ 'owner': owner }).sort('name')

		return res.json(lists)
	},

	async putUserInList(req, res) {
		const { id, dev } = req.body
		console.log(dev)

		/*const list = List.findOneAndUpdate({'_id': id}, { $push: { devs: dev  } }, function(err, doc) {
			if(err) {
				console.log(err)
				return res.send(500, { error: err })

			}
			return res.send(doc);
		})*/
	},
}