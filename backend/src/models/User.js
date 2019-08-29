const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    }
},{
    timestamps: true
})
module.exports = mongoose.model('User', UserSchema)