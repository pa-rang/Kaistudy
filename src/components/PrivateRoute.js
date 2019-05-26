import React from "react"
import { Route, Redirect } from "react-router-dom"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"

import { connect } from "react-redux"

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.getIn(["app", "isAuthenticated"])
	}
}

const mapDispatchToProps = {}

const PrivateRoute = (props) => {
	const { isAuthenticated } = props

	if (isAuthenticated)
		return <Route {...props}/>
	else {
		Swal.fire(
			'Authentication Required',
			'Please Login First to See Contents',
			'warning'
		)
		return <Redirect to={"/"} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
