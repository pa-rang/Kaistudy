import React from "react"

import { Route, Switch } from "react-router-dom"

import HomePage from "components/HomePage"
import ScrollToTop from "components/ScrollToTop"
import CreateGroup from "components/CreateGroup"

import AppWrapper from "./App.styled"
import "animate.css"
import GroupDetail from "./components/GroupDetail"

import Header from "./components/Header"

function App() {
	return (
		<AppWrapper>

			<Route path="/:url?" component={Header}/>
			<Route path="/:route?" component={ScrollToTop}/>

			<Switch>
				<Route path="/" exact component={HomePage}/>
				<Route path="/create-group" component={CreateGroup}/>
				<Route path="/group/:id" component={GroupDetail}/>
			</Switch>
		</AppWrapper>
	)
}

export default App
