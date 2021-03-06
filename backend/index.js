const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')
app.use(cors())

mongoose.connect('mongodb://payprev:admin123@ds253537.mlab.com:53537/payprev', {
    useNewUrlParser: true,
})

app.use((req, res, next) => {
    req.io = io

    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(require('./src/routes'))

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});