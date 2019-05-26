import { createAction, handleActions } from "redux-actions"
import { Map, fromJS } from "immutable"
import { pender } from "redux-pender"
import get from "lodash.get"

import * as API from "../../lib/api"

// action types
const SIGNIN = "app/SIGNIN"
const SIGNUP = "app/SIGNUP"
const LOGOUT = "app/LOGOUT"

//action creators
export const signIn = createAction(SIGNIN, API.signIn)
export const signUp = createAction(SIGNUP, API.signUp)
export const logout = createAction(LOGOUT, API.logout)

// initial state
const initialState = Map({
	auth: Map({}),
	isAuthenticated: false
})

// reducer
export default handleActions({
	...pender({
		type: SIGNIN,
		onSuccess: (state, action) => {
			const { data } = action.payload
			return state
				.set("auth", fromJS(data))
				.set('isAuthenticated', true)
		}
	}),
	...pender({
		type: SIGNUP,
		onSuccess: (state, action) => {
			const { data } = action.payload
			return state
				.set("auth", fromJS(data))
				.set('isAuthenticated', true)
		}
	}),
	...pender({
		type: LOGOUT,
		onSuccess: (state, action) => {
			return state
				.set("auth", initialState.auth)
				.set('isAuthenticated', false)
		}
	}),
}, initialState)
