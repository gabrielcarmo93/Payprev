import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	height: calc(100% - 50px);
	justify-content: center;
	flex-wrap: wrap !important;
	flex-direction: row !important;
	max-width: 980px;
	margin: 0 auto;

	.ui.simple.dropdown {
		height: 20px
	}
`