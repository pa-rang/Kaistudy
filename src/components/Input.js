import React from "react"
import PropTypes from "prop-types"

import styled from "styled-components"


const Input = styled.input`
		font-size: ${props => props.fontSize};
		line-height: 1.2;
		color: #363636;
		padding: 0 16px;
		border: none;
		border-bottom: 0.8px solid #c3c3c3;
		margin-bottom: 6px;
		&:last-child {
			margin-bottom: 0;
		}
		&::placeholder {
			transition: 0.2s;
			color: #c3c3c3;
		}

		&:focus {
			outline: none;
			&::placeholder {
				opacity: 0;
			}
		}
		height: 63px;	
`

Input.propTypes = {

}
Input.defaultProps = {
	fontSize: "20px",
}

export default Input
