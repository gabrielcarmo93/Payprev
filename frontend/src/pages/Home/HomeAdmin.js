import React, { Component } from 'react'
import { api, GitApi } from '../../services/api'
import { Input, Icon } from 'semantic-ui-react'

class HomeAdmin extends Component {
	state = {
		inputSearch: ''
	}

	async getDev() {
		GitApi.get(this.state.inputSearch)
			.then((response) =>{
				this.setState({dev: response.data})
				console.log(response)
			}).catch((error) => {
				console.log(error.response.statusText)
				this.setState({dev: null})
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
						this.state.dev ?
							<div class="ui card">
								<div class="image">
									<img src={this.state.dev.avatar_url} alt={this.state.dev.name} width={174} height={174} style={{width: '174px !important'}}/>
								</div>
								<div class="content">
									<a class="header">{this.state.dev.name}</a>
									<div class="meta">
										<span class="date">{this.state.dev.location}</span>
									</div>
									<div class="description">
										{this.state.dev.company}
									</div>
								</div>
									<div class="extra content">
								<a>
								<i class="folder open icon"></i>
									{this.state.dev.public_repos}
								</a>
								</div>
							</div>
						:
							<span>Nenhum usuário encontrado</span>
					}
				</div>
			</div>
		)
	}
}

export default HomeAdmin