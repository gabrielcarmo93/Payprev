import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://localhost:5000/'
	// baseURL: 'https://polar-eyrie-66111.herokuapp.com'
})

export const GitApi = axios.create({
	baseURL: 'https://api.github.com/users/'
})