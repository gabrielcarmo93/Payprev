import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../auth'

export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => Auth.isAuthenticated() ? (
				<Component {...props} />
			) :  (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
)