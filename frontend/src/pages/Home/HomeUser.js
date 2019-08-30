import React, { Component } from 'react'
import { api } from '../../services/api'
import { Feed, Button, Icon, Modal, Form, Dropdown, Menu } from 'semantic-ui-react'
import Auth from '../../auth'
import { Link } from 'react-router-dom'


class HomeUser extends Component {
	state = {
		devs: [],
		lists: [],
		showModal: false,
		createListName: ''
	}

	UNSAFE_componentWillMount() {
		this.loadDevs()
		this.loadLists()
	}

	loadDevs = async () => {
		const response = await api.get('/devs')
		this.setState({ devs: response.data })
	}

	loadLists = async () => {
		const id = Auth.getToken()
		const response = await api.get(`list/${id}`)
		this.setState({ lists: response.data })
	}

	createList = () => {
		const list = {
			name: this.state.createListName,
			owner: Auth.getToken()
		}
		
		api.post('/list', list)
			.then((response) => {
				this.loadLists()
				this.setState({ showModal: false, createListName: '' })
			}).catch((error) => {
				alert(error.response.data.message)
			})
	}

	joinList = (dev, list) => {
		dev.tags = ''
		const data = {
			dev: dev,
			id: list._id
		}
		

		api.post('joinList', data)
			.then((response) => {
				console.log(response)
			}).catch((error) => {
				console.log(error.response)
			})
	}

	render() {
		const showModal = this.state.showModal
		return (
			<div style={{height: '100%', width: '100%', padding: '5px 0', display: 'grid', gridTemplateRows: '5fr 1fr'}}>
				<div style={{border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box', margin: '5px 0', display: 'grid', maxHeight: '100%', overflowY: 'auto'}}>
					{
						this.state.devs.length ?
							this.state.devs.map(
								dev => (
									<Feed key={dev._id}>
										<Feed.Event>
											<Feed.Label>
												<Icon name="user circle outline" />
											</Feed.Label>
											<Feed.Content>
												<Feed.Summary>
													<Feed.User color="black">{dev.login}</Feed.User>
													<Feed.Date>
														<Menu secondary icon='sort down'>
															<Dropdown simple>
																<Dropdown.Menu>
																	<Dropdown.Item>
																		<Icon name='dropdown' />
																		Adicionar à Lista
																		<Dropdown.Menu>
																			{
																				this.state.lists.length > 0 ?
																					this.state.lists.map(
																						list => (
																							<Dropdown.Item
																								onClick={ () => this.joinList(dev, list) }
																							>
																								{list.name}
																							</Dropdown.Item>
																						)
																					)
																				:
																					<span>Nenhuma lista disponível</span>
																			}
																		</Dropdown.Menu>
																	</Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
														</Menu>
												    </Feed.Date>
												</Feed.Summary>
											</Feed.Content>
										</Feed.Event>
									</Feed>
								)
							)
						:
							'Nenhum desenvolvedor disponível'

					}
				</div>
				<div style={{boxSizing: 'border-box', margin: '5px 0'}}>
					<div style={{border: '1px solid #ccc', borderRadius: '6px', padding: '10px 20px'}}>
						<h5 style={{fontWeight: '400', textAlign: 'center', letterSpacing: '2px', color: '#777'}}>Listas de Devs</h5>
						<Modal
							size={'mini'}
							closeIcon
							onClose={() => this.setState({ showModal: false })}
							open={showModal}
							trigger={
								<Icon
									style={{color: 'green', cursor: 'pointer'}}
									className='plus circle'
									onClick={() => this.setState({ showModal: true }) }
									title='Criar Lista'
								/>
							}
						>
							<Modal.Header>Criar Lista</Modal.Header>
							<Modal.Content>
								<Form>
									<Form.Input
										placeholder="Digite o nome da Lista"
										value={this.state.createListName}
										name="createListName"
										onChange={e => this.setState({ [e.target.name]: e.target.value })}
									/>

									<Button
										fluid
										color="green"
										onClick={() => this.createList()}
									>
										Criar Lista
									</Button>
								</Form>
							</Modal.Content>
						</Modal>
						{
							this.state.lists.length ? 
								this.state.lists.map(
									list => (
										<Link key={list._id} to={`list/${list._id}`}>
											<Button style={{fontWeight: '400'}}><Icon name="folder open" />{list.name}</Button>
										</Link>
									)
								)
							:
								<div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
									<span>Nenhuma lista criada</span>
								</div>
						}
					</div>
				</div>
				
			</div>
		)
	}
}

export default HomeUser