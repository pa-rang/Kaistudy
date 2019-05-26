import React from "react"
import { Route, Redirect } from "react-router-dom"

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
	else
		return <Redirect to={"/"} />
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
