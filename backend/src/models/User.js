const mongoose = require('mongoose')

var optionalWithLength = function(minLength, maxLength) {
	minLength = minLength || 0
	maxLength = maxLength || Infinity
	return {
		validator : function(value) {
			if (value === undefined) return true
			return value.length >= minLength && value.length <= maxLength
		},
		message : 'Optional field is shorter than the minimum allowed length (' + minLength + ') or larger than the maximum allowed length (' + maxLength + ')'
	}
}

var validateEmail = function(email) {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	return re.test(email)
}

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