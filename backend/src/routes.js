const express = require('express')
const routes = new express.Router()
const UserController = require('./controllers/UserController')
const DevController = require('./controllers/DevController')

routes.get('/', (req, res) => {
    return res.send('index')
})

routes.get('/users', UserController.index)
routes.get('/user/:id', UserController.findById)
routes.post('/user', UserController.store)
routes.delete('/user/:id', UserController.deleteById)
routes.post('/login', UserController.login)
routes.get('/api', UserController.index)
routes.get('/devs', DevController.index)

module.exports = routes