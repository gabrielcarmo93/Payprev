import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './helpers/PrivateRoute'

import Home from './pages/Home/'
import Login from './pages/Login/'
import PageNotFound from './pages/PageNotFound/'

function Routes() {
	return (
		<Switch>
			<PrivateRoute path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="*" component={PageNotFound} />
		</Switch>
	)
}

export default Routes