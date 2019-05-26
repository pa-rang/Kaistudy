import React from "react"

import { Route, Switch } from "react-router-dom"

import HomePage from "components/HomePage"
import ScrollToTop from "components/ScrollToTop"
import CreateGroup from "components/CreateGroup"

import AppWrapper from "./App.styled"
import "animate.css"
import GroupDetail from "./components/GroupDetail"
import PrivateRoute from "components/PrivateRoute"
import MyPage from "components/MyPage"

import Header from "./components/Header"

function App() {
	return (
		<AppWrapper>

			<Route path="/:url?" component={Header}/>
			<Route path="/:route?" component={ScrollToTop}/>

			<Switch>
				<Route path="/" exact component={HomePage}/>
				<PrivateRoute path="/create-group" component={CreateGroup}/>
				<PrivateRoute path="/group/:id" component={GroupDetail}/>
				<PrivateRoute path="/my-page" component={MyPage}/>
			</Switch>
		</AppWrapper>
	)
}

export default App
