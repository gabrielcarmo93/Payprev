import React, { Component } from 'react'
import { Container } from './style'
import { api } from '../../services/api'
import Auth from '../../auth'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends Component {
	state = {
		user: {},
	}

	componentWillMount() {
		this.loadUser()
	}

	logout = async (e) => {
		Auth.deauthenticateUser()
	}

	loadUser = async () => {
		const id = Auth.getToken()
		const response = await api.get(`/user/${id}`)
		this.setState({ user: response.data })
	}

	render() {
		return (
			<Container style={{height: '50px', background: '#34304b', color: '#ccc'}}>
				<Link
					to="/"
					style={{color:"#ccc"}}
				>
					<h1><Icon name="money bill alternate" style={{margin: '0 15px 0 0'}}/>Payprev</h1>
				</Link>

				<div>
					{this.state.user.email}
				</div>

				<div>
					<Link to="/login" onClick={this.logout} style={{color: '#ccc'}}>Sair</Link>
				</div>
			</Container>
		)
	}
}

export default Header
