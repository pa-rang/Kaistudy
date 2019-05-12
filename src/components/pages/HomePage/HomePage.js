import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import HomePageWrapper from "./HomePage.styled"

class HomePage extends PureComponent {
	render() {
		return (
			<HomePageWrapper>
				{this.props.children}
				HomePage
				<h1>Home Page </h1>
			</HomePageWrapper>
		)
	}
}

HomePage.propTypes = {
}

HomePage.defaultProps = {
}

export default HomePage
