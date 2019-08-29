const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = {
    async index(req, res) {
        const users = await User.find().sort('name')

        return res.json(users)
    },

    async store(req, res) {
        const { email, cpf, userType } = req.body
        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, password) {
                if(!err) {
                    const user = User.create({
                        email,
                        cpf,
                        password,
                        userType
                    })
                    
                    return res.json(user);
                }
            })
        })
    },

    async login(req, res) {
        const { email } = req.body

        const user = await User.findOne({'email': email})
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, res) {
                if(req.body.password != user.password){
                    console.log('senha divergente')
                } else {
                    console.log('senha igual')
                }
            })
        } else {
            console.log('usuário não encontrado')
        }
    },
}