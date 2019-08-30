const User = require('../models/User')
const bcrypt = require('bcryptjs')


module.exports = {
    async index(req, res) {
        const users = await User.find().sort('name')

        return res.json(users)
    },

    async store(req, res) {
        const { email, cpf, userType } = req.body

        const salt = bcrypt.genSaltSync(10)
        const password = bcrypt.hashSync(req.body.password, salt)

        if(req.body.password.length >= 6){
            try {
                const user = await User.create({
                    email,
                    cpf,
                    userType,
                    password
                })

                return res.json(user)
            } catch(e) {
                res.statusMessage = 'Incorrect User Data'
                return res.status(400).send({ message: 'Dados Incorretos - '+ e.message }).end()
            }

        } else {
            res.statusMessage = 'Incorrect Password'
            return res.status(400).end()
        }
    },

    async login(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({'email': email})
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                return res.json(user)
            } else {
                res.statusMessage = 'Password not match'
                return res.status(400).send({ message: 'Senha incorreta'}).end()
            }
        } else {
            res.statusMessage = 'User not Found'
            return res.status(400).send({ message: 'Usuário não encontrado'}).end()
        }
    },

    async findById(req, res) {
        const { id } = req.params

        const user = await User.findById(id, function (err, user) {
            if(err) {
                res.statusMessage = 'User not found'
                return res.status(400).send({ message: 'Usuário não encontrado'}).end()
            } else {
                return res.json(user)
            }
        })
    },

    async deleteById(req, res) {
        const { id } = req.params

        const user =  await User.deleteOne({ '_id': id })

        return res.json(user)
    }
}