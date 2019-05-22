import React from "react"

import { Switch, Route, NavLink, Link } from "react-router-dom"
import Modal from 'react-modal';
import Cleave from 'cleave.js/react';
import AnchorLink from 'react-anchor-link-smooth-scroll'

import HomePage from "components/HomePage"

import logo from "static/logo/logo.svg"

import AppWrapper from "./App.styled"
import "animate.css"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
	state = { scrollY: 0, isSignInOpen: false, isSignUpOpen: false }

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

	openSignIn = () => {
		this.setState({isSignInOpen: true});
	}

	openSignUp = () => {
		this.setState({isSignUpOpen: true});
	}

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
	}

	closeSignIn = () => {
		this.setState({isSignInOpen: false});
	}

	closeSignUp = () => {
		this.setState({isSignUpOpen: false});
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

	onOpenClick = () => {
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
							<input placeholder="Email" type="email" />
							<input placeholder="Password" type="password" />

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
	render() {
		const { scrollY } = this.state
		const { url } = this.props.match.params



		return (
			<header className={`header ${scrollY > 0 ? "scrolled" : ""}`}>
				<Modal
					isOpen={this.state.isSignInOpen}
					onRequestClose={this.closeSignIn}
					style={customStyles}
					contentLabel="SignIn Modal"
				>
					<div className="modal">
						<button className="close" onClick={this.closeSignIn}></button>
						<div className="modal-head">
							Welcome to <img className="inline-logo" src={logo} />
						</div>

						<div className="modal-body">
							<form id="signin" className="form" onSubmit={this.signin}>
								<input placeholder="Email" type="email" />
								<input placeholder="Password" type="password" />

							</form>
						</div>

						<div className="modal-footer">
							<button type="submit" form="signin" className="button button-purple button-large" style={{ width: "100%" }}>
								Sign In
							</button>
						</div>
					</div>
				</Modal>


				<Modal
					isOpen={this.state.isSignUpOpen}
					onRequestClose={this.closeSignUp}
					style={customStyles}
					contentLabel="SignUp Modal"
				>
					<div className="modal">
						<button className="close" onClick={this.closeSignUp}></button>
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
					</div>
				</Modal>



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
									<AnchorLink href='#main'>Main</AnchorLink>
								</React.Fragment>
						}
						<NavLink to="/my-page">My Page</NavLink>
					</div>

					<div className="auth-buttons">
						<button className="button button-trans button-medium" style={{ fontSize: "18px" }}
										onClick={this.openSignIn}
						>Log in</button>
						<button className="button button-trans button-medium" style={{ fontSize: "18px" }}
										onClick={this.onOpenClick}
						>Log in</button>
						<button className="button button-orange button-medium" style={{ fontSize: "18px" }}
										onClick={this.openSignUp}
						>Sign up</button>
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

			<Switch>
				<Route path="/" exact component={HomePage} />
			</Switch>
		</AppWrapper>
	)
}

export default App
