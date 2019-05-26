import React from "react"

import { Switch, Route, NavLink, Link } from "react-router-dom"
import Modal from 'react-modal';
import Cleave from 'cleave.js/react';
import AnchorLink from 'react-anchor-link-smooth-scroll'

import HomePage from "components/HomePage"
import ScrollToTop from "components/ScrollToTop"
import CreateGroup from "components/CreateGroup"
import Input from "components/Input"

import logo from "static/logo/logo.svg"

import AppWrapper from "./App.styled"
import "animate.css"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import GroupDetail from "./components/GroupDetail"

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)',
		width: "626px",
		height: "auto",
		//minHeight: "480px",
		borderRadius: "16px",
		padding: 0,
	}
};

Modal.setAppElement('#root')

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
			if (window.scrollY === 0) {
				document.getElementsByClassName("page-wrapper")[0].classList.remove("scrolled")
			} else {
				document.getElementsByClassName("page-wrapper")[0].classList.add("scrolled")
			}
			this.setState({
				scrollY: window.scrollY,
				clicked: false
			})
			//console.log("scroll ", this.state)
		})
	}

	signin = e => {
		e.preventDefault()
		alert("Sign In")
	}
	signup = e => {
		e.preventDefault()
		alert("Sign Up")
	}

	onPhoneChange(event) {
		// formatted pretty value
		console.log(event.target.value);

		// raw value
		console.log(event.target.rawValue);
	}

	onSignInOpen = () => {
		const MySwal = withReactContent(Swal)
		MySwal.fire({
			title: null,
			footer: null,
			width: "626px",
			height: "auto",
			//minHeight: "480px",
			borderRadius: "16px",
			padding: 0,
			showConfirmButton: false,
			//animation: false,
			//customClass: {
			//	popup: 'animated bounceIn'
			//},
			html:
				<div className="modal">
					<button className="close" onClick={MySwal.clickCancel}/>
					<div className="modal-head">
						Welcome to <img className="inline-logo" src={logo} />
					</div>

					<div className="modal-body">
						<form id="signin" className="form" onSubmit={this.signin}>
							<Input placeholder="Email" type="email" />
							<Input placeholder="Password" type="password" />

						</form>
					</div>

					<div className="modal-footer">
						<button type="submit" form="signin" className="button button-purple button-large" style={{ width: "100%" }}>
							Sign In
						</button>
					</div>
				</div>,
			onOpen: () => {
				// `MySwal` is a subclass of `Swal`
				//   with all the same instance & static methods
				//MySwal.clickConfirm()
			}
		}).then(() => {
			//return MySwal.fire(<p>Shorthand works too</p>)
		})
	}

	onSignUpOpen = () => {
		const MySwal = withReactContent(Swal)
		MySwal.fire({
			title: null,
			footer: null,
			width: "626px",
			height: "auto",
			//minHeight: "480px",
			borderRadius: "16px",
			padding: 0,
			showConfirmButton: false,
			//animation: false,
			//customClass: {
			//	popup: 'animated bounceIn'
			//},
			html:
				<div className="modal">
					<button className="close" onClick={MySwal.clickCancel}></button>
					<div className="modal-head">
						Create an Account
					</div>

					<div className="modal-body">
						<form id="signup" className="form" onSubmit={this.signup}>
							<div className="input-group">
								<input type="text" className="input-h" placeholder="First name" />
								<input type="text" className="input-h" placeholder="Last name" />
							</div>

							<input placeholder="Email" type="email" />
							<input placeholder="Password" type="password" />
							<input placeholder="Password Confirm" type="password" />

							<Cleave placeholder="Student ID"
											style={{ width: "30%"}}
											options={{
												numericOnly: true,
												blocks: [8]
											}}
							/>
							<Cleave placeholder="Phone number"
											style={{ width: "30%"}}
											options={{
												numericOnly: true,
												blocks: [3, 4, 4],
												delimiter: '-',
											}}
											onChange={this.onPhoneChange} />
						</form>
					</div>

					<div className="modal-footer">
						<button type="submit" form="signup" className="button button-purple button-large" style={{ width: "100%" }}>
							Sign In
						</button>
					</div>
				</div>,
			onOpen: () => {
				// `MySwal` is a subclass of `Swal`
				//   with all the same instance & static methods
				//MySwal.clickConfirm()
			}
		}).then(() => {
			//return MySwal.fire(<p>Shorthand works too</p>)
		})
	}


	render() {
		const { scrollY } = this.state
		const { url } = this.props.match.params



		return (
			<header className={`header ${scrollY > 0 ? "scrolled" : ""}`}>
				<div className="background-wrapper">
					<div className="container">
						<Link to="/" style={{ height: "auto" }}>
							<img src={logo} width="100px"/>
						</Link>
						<div className="main_menu" style={{
							right: "210px"
						}}>
							{
								url ?
									<React.Fragment>
										<NavLink to="/" exact>Home</NavLink>
										<NavLink to="/#main">Main</NavLink>
									</React.Fragment>
									:
									<React.Fragment>
										<AnchorLink href='#root'>Home</AnchorLink>
										<AnchorLink offset="40px" href='#main'>Main</AnchorLink>
									</React.Fragment>
							}
							<NavLink to="/my-page">My Page</NavLink>
						</div>

						<div className="auth-buttons">
							<button className="button button-trans button-medium" style={{ fontSize: "18px" }}
											onClick={this.onSignInOpen}
							>Log in</button>
							<button className="button button-orange button-medium" style={{ fontSize: "18px"}}
											onClick={this.onSignUpOpen}
							>Sign up</button>
						</div>
					</div>
				</div>
			</header>
		)
	}
}
function App() {
	return (
		<AppWrapper>

			<Route path="/:url?" component={Header} />
			<Route path="/:route?" component={ScrollToTop} />

			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/create-group" component={CreateGroup} />
				<Route path="/group/:id" component={GroupDetail} />
			</Switch>
		</AppWrapper>
	)
}

export default App
