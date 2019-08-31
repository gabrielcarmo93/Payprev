import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './helpers/PrivateRoute'

import Home from './pages/Home/'
import Login from './pages/Login/'
import PageNotFound from './pages/PageNotFound/'
import List from './pages/List/'

function Routes() {
	return (
		<Switch>
			<PrivateRoute path="/" exact component={Home} />
			<PrivateRoute path="/list/:id" exact component={List} />
			<Route path="/login" exact component={Login} />
			<Route path="*" component={PageNotFound} />
		</Switch>
	)
}

export default Routes