import React from "react"
import Cleave from 'cleave.js/react';
import { connect } from "react-redux"
import AnchorLink from 'react-anchor-link-smooth-scroll'

import logo from "../static/logo/logo.svg"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { Link, NavLink } from "react-router-dom"
import Input from "components/Input"

import toJS from "../hoc/toJS"
import { signIn, signUp, logout } from "../store/reducers/app"

const mapDispatchToProps = {
	signIn,
	signUp,
	logout
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.getIn(["app", "isAuthenticated"]),
		auth: state.getIn(["app", "auth"])
	}
}

class SignUpModal extends React.PureComponent {
	state = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirm: "",
		student_id: "",
		phone_number: "",
		error: null
	}

	onSIDChange = (event) => {
		this.setState({ "student_id": event.target.rawValue })
	}

	onPhoneChange = (event) => {
		this.setState({ "phone_number": event.target.rawValue })
	}

	handleChange = ({ target: { name, value }}) => this.setState({ [name]: value })

	signUp = (e) => {
		e.preventDefault()
		const { clickCancel, signUp } = this.props
		const { password, password_confirm } = this.state
		if (password !== password_confirm) {
			this.setState({ error: new Error("Confirm password does not match")})
		} else {
			this.setState({ error: null })
			signUp(this.state)
				.then(clickCancel)
				.catch(error => {
					console.log(error)
					this.setState({ error: new Error("All fields must be filled") })
				})
		}
	}

	render() {
		const { clickCancel, signUp } = this.props
		const {
			first_name,
			last_name,
			email,
			password,
			password_confirm,
			student_id,
			phone_number,
			error
		} = this.state

		const { handleChange } = this

		return (
			<div className="modal" >
				<button className="close" onClick={clickCancel}></button>
				<div className="modal-head">
					Create an Account
				</div>

				<div className="modal-body">
					<form id="signup" className="form"  onSubmit={this.signUp}>
						<div className="input-group">
							<input type="text" className="input-h" placeholder="First name" name="first_name" value={first_name} onChange={handleChange} />
							<input type="text" className="input-h" placeholder="Last name" name="last_name" value={last_name} onChange={handleChange} />
						</div>

						<input placeholder="Email" type="email" name="email" value={email} onChange={handleChange}/>
						<input placeholder="Password" type="password"  name="password" value={password} onChange={handleChange}/>
						<input placeholder="Password Confirm" type="password" name="password_confirm" value={password_confirm} onChange={handleChange} />

						<Cleave placeholder="Student ID"
										style={{ width: "30%"}}
										options={{
											numericOnly: true,
											blocks: [8]
										}}
										onChange={this.onSIDChange}
						/>
						<Cleave placeholder="Phone number"
										style={{ width: "30%"}}
										options={{
											numericOnly: true,
											blocks: [3, 4, 4],
											delimiter: '-',
										}}
										onChange={this.onPhoneChange} />
						{error && <div style={{ color: "red" }}>{error.message}</div>}
					</form>
				</div>

				<div className="modal-footer">
					<button type="submit" form="signup" className="button button-purple button-large" style={{ width: "100%" }}>
						Sign Up
					</button>
				</div>
			</div>
		)
	}
}

class SignInModal extends React.PureComponent {
	state = {
		student_id: "",
		password: "",
		error: null
	}

	onSIDChange = (event) => {
		this.setState({ "student_id": event.target.rawValue })
	}

	handleChange = ({ target: { name, value }}) => this.setState({ [name]: value })

	signIn = (e) => {
		e.preventDefault()
		const { cancel, signIn } = this.props
		this.setState({ error: null })
		signIn(this.state)
			.then(cancel)
			.catch(error => {
				console.log(error)
				this.setState({ error: new Error("Student ID Password Not Matched") })
			})
	}
	render() {
		const { cancel } = this.props
		const { error } = this.state

		return (
			<div className="modal">
				<button className="close" onClick={cancel}/>
				<div className="modal-head">
					Welcome to <img className="inline-logo" src={logo} />
				</div>

				<div className="modal-body">
					<form id="signin" className="form" onSubmit={this.signIn}>
						<Cleave placeholder="Student ID"
										options={{
											numericOnly: true,
											blocks: [8]
										}}
										onChange={this.onSIDChange}
						/>
						<Input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
						{error && <div style={{ color: "red" }}>{error.message}</div>}
					</form>
				</div>

				<div className="modal-footer">
					<button type="submit" form="signin" className="button button-purple button-large" style={{ width: "100%" }}>
						Sign In
					</button>
				</div>
			</div>
		)
	}
}


class Header extends React.Component {
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
				<SignInModal cancel={MySwal.clickCancel} signIn={this.props.signIn}/>,
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
				<SignUpModal clickCancel={MySwal.clickCancel} signIn={this.props.signUp} />
			,
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
		const { isAuthenticated } = this.props
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

						{
							isAuthenticated ?
							<div className="auth-buttons">
								<button className="button button-trans button-medium" style={{ fontSize: "18px" }}
												onClick={this.props.logout}
								>Logout</button>
							</div>
							:
							<div className="auth-buttons">
								<button className="button button-trans button-medium" style={{ fontSize: "18px" }}
												onClick={this.onSignInOpen}
								>Log in</button>
								<button className="button button-orange button-medium" style={{ fontSize: "18px" }}
												onClick={this.onSignUpOpen}
								>Sign up</button>
							</div>
						}
					</div>
				</div>
			</header>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Header))
