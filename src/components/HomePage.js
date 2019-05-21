import React, { PureComponent } from "react"

class HomePage extends PureComponent {
	render() {
		return (
			<div className="page-wrapper" id="homepage">
				<div className="container">
					<div className="sub_menu">
						<span className="login_section" style={{ display: "block" }}>log In</span>
						<span className="signup_section" style={{ display: "block" }}>Sign Up</span>
					</div>

					<div id="app_main" className="content-wrap intro">
					</div>
				</div>
			</div>
		)
	}
}

export default HomePage
