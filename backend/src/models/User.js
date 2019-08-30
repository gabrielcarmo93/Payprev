const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, insira um e-mail válido']
		},
		cpf: {
			type: String,
			required: true,
			match: [/\d{3}\.\d{3}\.\d{3}-\d{2}/, 'Por favor, insira um CPF válido']
		},
		password: {
			type: String,
			required: true,
			minlength: 6
		},
		userType: {
			type: String,
			enum : ['user','admin'],
			default: 'user'
		}
	},{
		timestamps: true
	}
)
module.exports = mongoose.model('User', UserSchema)