import { createGlobalStyle } from 'styled-components'

// import 'react-perfect-scrollbar/dist/css/styles.css';
import 'semantic-ui-css/semantic.min.css'

export default createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Livvic:300,400,500,600,700&display=swap');

	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
	}

	html, body, #root {
		height: 100%;
	}

	body {
		font-family: 'Livvic', sans-serif;
		font-weight: 400;
		font-size: 16px;
		background: #e0e1e2;
		color: #333;
		-webkit-font-smoothing: antialiased !important;
	}

	ul {
		list-style: none;
	}
`