class Auth {
	/**
	* Authenticate a user. Save a token string in Local Storage
	*
	* @param {string} token
	*/
	/* eslint-disable no-undef */
	static authenticateUser (token, mode) {
		if(mode==='session')
			sessionStorage.setItem('@ceb/userId', token)
		if(mode==='local')
			localStorage.setItem('@ceb/userId', token)
	}

	static authNotified () {
		localStorage.setItem('authNotified', true)
	}

	static getAuthNotified () {
		return localStorage.getItem('authNotified')
	}

	static storeReferer (path) {
		localStorage.setItem('referer', path)
	}

	static getReferer () {
		return localStorage.getItem('referer')
	}

	/**
	* Check if a user is authenticated - check if a token is saved in Local Storage
	*
	* @returns {boolean}
	*/
	static isAuthenticated () {
		return (localStorage.getItem('@ceb/userId') ? localStorage.getItem('@ceb/userId') : sessionStorage.getItem('@ceb/userId')) !== null
	}

	/**
	* Deauthenticate a user. Remove a token from Local Storage.
	*
	*/
	static deauthenticateUser () {
		localStorage.getItem('@ceb/userId') ? localStorage.removeItem('@ceb/userId') : sessionStorage.removeItem('@ceb/userId')
	}

	/**
	* Get a token value.
	*
	* @returns {string}
	*/

	static getToken () {
		return (localStorage.getItem('@ceb/userId') ? localStorage.getItem('@ceb/userId') : sessionStorage.getItem('@ceb/userId'))
	}
}

export default Auth