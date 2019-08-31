import React, { Component } from 'react'
import Auth from '../../auth'
import { api } from '../../services/api'
import { Container } from './style'
import HomeUser from './HomeUser'
import HomeAdmin from './HomeAdmin'

import Header from '../../components/Header'

class Home extends Component {
	state = {
		user: {},
	}

	UNSAFE_componentWillMount() {
		this.loadUser()
	}

	loadUser = async () => {
		const id = Auth.getToken()
		const response = await api.get(`/user/${id}`)
		this.setState({ user: response.data })
	}

	logout = async (e) => {
		Auth.deauthenticateUser()
	}
	render() {
		return (
			<>
			<Header />
			<Container>
				{
					(this.state.user.userType==="admin") ?
						<HomeAdmin />
					:
						<HomeUser />
				}
			</Container>
			</>
		)
	}
}

export default Home