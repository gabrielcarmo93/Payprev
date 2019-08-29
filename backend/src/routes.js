const express = require('express')
const routes = new express.Router()
const UserController = require('./controllers/UserController')

routes.get('/', (req, res) => {
    return res.send('index')
})

routes.get('/users', UserController.index)
routes.post('/user', UserController.store)
routes.post('/login', UserController.login)

module.exports = routes