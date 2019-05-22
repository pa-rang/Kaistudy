import React from "react"

import { Switch, Route, NavLink } from "react-router-dom"
import Modal from 'react-modal';

import HomePage from "components/HomePage"

import AppWrapper from "./App.styled"


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
	state = { scrollY: 0, isModalOpen: false }

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

	openModal = () => {
		this.setState({modalIsOpen: true});
	}

	afterOpenModal = () => {
		// references are now sync'd and can be accessed.
	}

	closeModal = () => {
		this.setState({modalIsOpen: false});
	}

	render() {
		const { scrollY } = this.state

		return (
			<header className={`header ${scrollY > 0 ? "scrolled" : ""}`}>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Example Modal"
				>
					<div className="modal">
						<div className="modal-head">
							Welcome to KAIStudy
						</div>

						<div className="modal-body">
							<input placeholder="Email" type="email" />
							<input placeholder="Password" type="password" />
						</div>

						<div className="modal-footer">
							<button className="button button-purple button-large" style={{ width: "100%" }}>
								Sign In
							</button>
						</div>
					</div>
				</Modal>

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
						<button className="button button-trans button-medium" style={{ fontSize: "18px" }}
										onClick={this.openModal}
						>Log in</button>
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
