import React, { Component } from 'react'
import { api } from '../../services/api'


class HomeUser extends Component {
	state = {
		devs: []
	}

	UNSAFE_componentWillMount() {
		this.loadDevs()
	}

	loadDevs = async () => {
		const response = await api.get('/devs')
		this.setState({ devs: response.data })
	}

	render() {
		return (
			<>
				{
					this.state.devs.length ?
						this.state.devs.map(
							dev => (
								<h1>{dev.email}</h1>
							)
						)
					:
						'Nenhum desenvolvedor disponível'
				}
			</>
		)
	}
}

export default HomeUser