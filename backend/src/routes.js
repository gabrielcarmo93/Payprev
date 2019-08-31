const express = require('express')
const routes = new express.Router()
const UserController = require('./controllers/UserController')
const DevController = require('./controllers/DevController')
const ListController = require('./controllers/ListController')

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
routes.post('/dev', DevController.store)

routes.get('/lists', ListController.index)
routes.post('/list', ListController.store)
routes.post('/joinList', ListController.putUserInList)
routes.get('/lists/:owner', ListController.listsByOwner)
routes.get('/list/:id', ListController.listById)
routes.put('/list', ListController.update)
routes.delete('/list/:id', ListController.delete)

module.exports = routes