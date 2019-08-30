import React, { Component } from 'react'
import { api, GitApi } from '../../services/api'
import { Button, Checkbox, Form, Grid, Header, Message, Segment, Icon } from 'semantic-ui-react'

class HomeAdmin extends Component {
	state = {
		
	}
	render() {
		return (
			<div style={{height: '100%', width: '100%', padding: '50px 10px'}}>
				<Form style={{}}>
					<Form.Input
						placeholder="Digite o nome do Dev que deseja pesquisar"
					/>
				</Form>
			</div>
		)
	}
}

export default HomeAdmin