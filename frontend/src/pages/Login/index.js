import React, { Component } from 'react';

import { api } from '../../services/api'
import Auth from '../../auth'
import { Link, FlexDiv } from './style'
import { Button, Checkbox, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { cpfMask } from './mask'

class Login extends Component {
	state = {
		register: false,
		stayConnected: false,
		redirect: false,
		admin: false
	}

	UNSAFE_componentWillMount() {
		if(localStorage.getItem("@ceb/userId") || sessionStorage.getItem('@ceb/userId')) {
			this.setState({ redirect: true })
		}
	}

	stayConnected = () => {
		this.setState({ stayConnected: !this.state.stayConnected })
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = async (e) => {
		if(this.state.email && this.state.password){
			if( this.state.email.length > 0 && this.state.password.length > 0) {
				const user = {
					email: this.state.email ? this.state.email : null,
					password: this.state.password ? this.state.password : null
				}

				await api.post('/login', user).then(response => {
					if(this.state.stayConnected) {
						Auth.authenticateUser(response.data._id, 'local')
						// localStorage.setItem("@ceb/userId", response.data._id)
					} else {
						Auth.authenticateUser(response.data._id, 'session')
						// sessionStorage.setItem("@ceb/userId", response.data._id)
					}
					
					this.setState({ redirect: true })
				}).catch(error => {
					alert('error.response.data')
					// alert('Erro ao logar-se')
				})
			}
		} else {
			if(!this.state.email && !this.state.password)
				alert('Preencha o usuário e a senha')
			else if(!this.state.email)
				alert('Preencha o usuário')
			else if(!this.state.password)
				alert('Preencha a senha')
		}

	}

	handleSubmitRegister = async (e) => {
		if(this.state.email && this.state.cpf && this.state.password.length > 0) {
			if(this.state.password === this.state.password2) {
				const user = {
					email: this.state.email ? this.state.email : null,
					cpf: this.state.cpf ? this.state.cpf : null,
					password: this.state.password ? this.state.password : null,
					userType: this.state.admin ? 'admin' : 'user'
				}

				await api.post('/user', user).then(response => {
					alert('Usuário cadastrado com Sucesso')
					this.setState({ email: '', cpf: '',password: '', password2: '', admin: false, register: false })
				}).catch(error => {
					// console.log(error.response.data.message)
					alert(error.response.data.message)
				})


			} else {
				alert("As senhas precisam ser iguais")
				this.setState({ password: '', password2: ''})
			}
		} else {
			alert("Algo nulo")
		}
	}

	render() {
		return (
			<>
			{ this.state.redirect ? <Redirect to='/' /> : '' }
			{
				this.state.register
				?
				<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 460, padding: '0 30px' }}>
						<Header as='h2' color='blue' textAlign='center'>
						Cadastro de Usuário
						</Header>
						<Form size='small'>
							<Segment stacked>
								<Form.Input
									fluid
									icon='envelope'
									iconPosition='left'
									placeholder='Email'
									type='email'
									name='email'
									value={this.state.email}
									onChange={this.handleChange}
									autoComplete="off"
								/>

								<Form.Input
									fluid
									icon='id card outline'
									iconPosition='left'
									placeholder='CPF'
									type='text'
									name='cpf'
									value={this.state.cpf}
									onChange={e => this.setState({ [e.target.name]: cpfMask(e.target.value) })}
									autoComplete="off"
								/>

								<Form.Input
									fluid
									icon='lock'
									iconPosition='left'
									placeholder='Senha'
									type='password'
									name='password'
									minLength={6}
									value={this.state.password}
									onChange={this.handleChange}
								/>

								<Form.Input
									fluid
									icon='lock'
									iconPosition='left'
									placeholder='Repita a Senha'
									type='password'
									name='password2'
									minLength={6}
									value={this.state.password2}
									onChange={this.handleChange}
								/>

								<FlexDiv>
									<Checkbox label="Administrador" onChange={() => this.setState({ admin: !this.state.admin })} checked={this.state.admin} required/>
								</FlexDiv>

								<Button
									type='submit'
									onClick={this.handleSubmitRegister}
									color='blue'
									fluid size='large'
								>
									Registrar
								</Button>
							</Segment>
						</Form>
						<Message>
							<Icon color="grey" onClick={() => this.setState({ register: false, email: '', password: '', password2: '', cpf: '', admin: false })} name="home" style={{cursor: 'pointer'}} />
						</Message>

					</Grid.Column>
				</Grid>
				:
				<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
					<Grid.Column style={{ maxWidth: 460, padding: '0 30px' }}>
						<Header as='h2' color='grey' textAlign='center'>
							<i className='money bill alternate icon' />Payprev
						</Header>
						<Form size='small'>
							<Segment stacked>
								<Form.Input
									fluid
									icon='mail'
									iconPosition='left'
									placeholder='E-mail'
									type='text'
									name='email'
									value={this.state.email}
									onChange={e => this.setState({ [e.target.name]: e.target.value })}
									autoComplete="off"
								/>

								<Form.Input
									fluid
									icon='lock'
									iconPosition='left'
									placeholder='Senha'
									type='password'
									name='password'
									value={this.state.password}
									onChange={this.handleChange}
								/>

								<FlexDiv>
									<Checkbox label="Manter conectado" onChange={this.stayConnected} checked={this.state.stayConnected} required/>
								</FlexDiv>



								<Button
									type='submit'
									onClick={this.handleSubmit}
									color='blue'
									fluid size='large'
								>
									Entrar
								</Button>
							</Segment>
						</Form>
						<Message>
							Ainda não é cadastrado?
							<Link color="blue" onClick={() => this.setState({ register: true, username: '', email: '', password: '', password2: '', login: '', registry: '' })}> Cadastre-se</Link>
						</Message>

					</Grid.Column>
				</Grid>
			}
			</>
		)
	}
}

export default Login