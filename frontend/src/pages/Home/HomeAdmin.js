import React, { Component } from 'react'
import { api, GitApi } from '../../services/api'
import { Input, Icon, Button } from 'semantic-ui-react'

class HomeAdmin extends Component {
	state = {
		inputSearch: ''
	}

	async getDev() {
		GitApi.get(this.state.inputSearch)
			.then((response) =>{
				this.setState({dev: response.data})
				// console.log(response)
			}).catch((error) => {
				// alert(error.response.statusText)
				this.setState({dev: ''})
			})
	}

	async addDev() {

		const dev = {
			login: this.state.dev.login,
			name: this.state.dev.name,
			bio: this.state.dev.bio,
			location: this.state.dev.location,
			html_url: this.state.dev.html_url
		}

		api.post('/dev', dev)
			.then((response) => {
				alert('Adicionado com sucesso')
				// console.log(response)
			}).catch((error) => {
				console.log(error.response)
			})
	}

	render() {
		return (
			<div style={{height: '100%', width: '100%', padding: '50px 20px'}}>
				<Input
					icon={{name: 'search', circular: false, link: true, onClick: () => this.getDev()}}
					placeholder='Digite o nome do Dev que deseja pesquisar'
					style={{width: '100%',}}
					onKeyUp={e => (e.keyCode === 13) ? this.getDev() : ''}
					name="inputSearch"
					value={this.state.inputSearch}
					onChange={e => this.setState({ [e.target.name] : e.target.value })}
				/>
				<div style={{display: 'flex', width: '100%', justifyContent: 'center', margin: '20px 0'}}>
					{
						this.state.inputSearch.length > 0 ?
							this.state.dev ?
								<div style={{display: 'flex', flexDirection: 'column'}}>
									<div className="ui card">
										<div className="image">
											<img src={this.state.dev.avatar_url} alt={this.state.dev.name}/>
										</div>
										<div className="content">
											<span href="#" className="header">{this.state.dev.name}</span>
											<div className="meta">
												<span className="date">{this.state.dev.location}</span>
											</div>
											<div className="description">
												{this.state.dev.company}
											</div>
										</div>
										<div className="extra content">
											<span href="#" title="Repositórios">
											<i className="folder open icon"></i>
												{this.state.dev.public_repos}
											</span>
										</div>

									</div>
									<Button
										style={{background: "white"}}
										title="Adicionar"
										onClick={() => this.addDev()}
									>
										<Icon
											name="plus"
										/>
									</Button>
								</div>
							:
								<span>Nenhum usuário encontrado</span>
						:
							''
					}
				</div>
			</div>
		)
	}
}

export default HomeAdmin