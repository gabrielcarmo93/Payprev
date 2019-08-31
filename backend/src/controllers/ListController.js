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
				return res.status(500).send('Erro ao gravar lista')
			})
	},

	async listById(req, res) {
		const { id } = req.params

		const list = await List.findById(id)

		return res.json(list)
	},

	async listsByOwner(req, res) {
		const { owner } = req.params

		const lists = await List.find({ 'owner': owner }).sort('name')

		return res.json(lists)
	},

	async putUserInList(req, res) {
		const { id, dev } = req.body

		const list = List.findOneAndUpdate({'_id': id}, { $addToSet: { devs: dev  } }, function(err, doc) {
			if(err) {
				return res.send(500, { error: err })

			}
			return res.send(doc);
		})
	},

	async update(req, res) {
		const list = await List.updateOne({'_id': req.body._id}, req.body)

		return res.send(list)
	},

	async delete(req, res) {
		const list = await List.findOneAndDelete({'_id': req.params.id})

		return res.json(list)
	}
}