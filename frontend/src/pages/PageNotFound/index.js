import React, { Component } from 'react'

import { Container } from './style'
import moment from 'moment'
import ReactMomentCountDown from 'react-moment-countdown'

class PageNotFound extends Component {
	state = {
		countdown: 0
	}

	componentDidMount() {
		
	}

	render() {
		const countdown = moment().add(10, 'seconds')
		return (
			<Container>
				<h1>Parece que você está perdido...</h1>
				<span>Em <ReactMomentCountDown toDate={countdown} targetFormatMask='s' onCountdownEnd={() => this.props.history.push('/')}/> segundos esta página irá retornar para página inicial</span>
			</Container>
		)
	}
}

export default PageNotFound