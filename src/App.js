import React from "react"

import { Switch, Route } from "react-router-dom"

import { HomePage } from "components/pages"

import AppWrapper from "./App.styled"

function App() {
	return (
		<AppWrapper>
			<Switch>
				<Route path="/" component={HomePage} />
			</Switch>
		</AppWrapper>
	)
}

export default App
