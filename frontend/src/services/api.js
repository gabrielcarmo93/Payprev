import axios from 'axios'

export const api = axios.create({
	// baseURL: 'http://localhost:5000/'
	baseURL: 'https://payprev-backend.herokuapp.com/'
})

export const GitApi = axios.create({
	baseURL: 'https://api.github.com/users/'
})