import React from "react"

import { Switch, Route, NavLink } from "react-router-dom"

import HomePage from "components/HomePage"

import AppWrapper from "./App.styled"

class Header extends React.PureComponent {
	state = { scrollY: 0 }

	componentDidMount() {
		// handle event
		window.addEventListener("optimizedResize", () => {
			this.setState({
				fit: window.innerHeight / window.innerWidth > 3 / 4 ? "fit-height" : "fit-width",
			})
			//console.log("Resource conscious resize callback!")
		})

		window.addEventListener("optimizedScroll", a => {
			this.setState({
				scrollY: window.scrollY,
				clicked: false
			})
			//console.log("scroll ", this.state)
		})
	}

	render() {
		const { scrollY } = this.state

		return (
			<header className={`header ${scrollY > 0 ? "scrolled" : ""}`}>
				<div className="container">
					<span className="logo">
						<a href="/">
							<img src="KAIStudy Logo.png" width="100px"/>
						</a>
					</span>
					<div className="main_menu" style={{
						right: "210px"
					}}>
						<NavLink to="/" exact>Home</NavLink>
						<NavLink to="/main">Main</NavLink>
						<NavLink to="/my-page">My Page</NavLink>
					</div>

					<div className="auth-buttons">
						<button className="button button-trans button-medium" style={{ fontSize: "18px" }}>Log in</button>
						<button className="button button-orange button-medium" style={{ fontSize: "18px" }}>Sign up</button>
					</div>
				</div>
			</header>
		)
	}
}
function App() {
	return (
		<AppWrapper>

			<Header/>

			<Switch>
				<Route path="/" component={HomePage} />
			</Switch>
		</AppWrapper>
	)
}

export default App
