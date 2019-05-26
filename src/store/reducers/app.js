import { createAction, handleActions } from "redux-actions"
import { Map, fromJS } from "immutable"
import { pender } from "redux-pender"
import get from "lodash.get"

import storage from "lib/storage"

import * as API from "../../lib/api"

// action types
const SIGNIN = "app/SIGNIN"
const SIGNUP = "app/SIGNUP"
const LOGOUT = "app/LOGOUT"

const SET_AUTH = "app/SET_AUTH"
const REFRES_AUTH = "app/REFRESH_AUTH"

//action creators
export const signIn = createAction(SIGNIN, API.signIn)
export const signUp = createAction(SIGNUP, API.signUp)
export const logout = createAction(LOGOUT, API.logout)
export const setAuth = createAction(SET_AUTH)
export const refreshAuth = createAction(REFRES_AUTH, API.getAuth)

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
			storage.setItem("auth", data)
			return state
				.set("auth", fromJS(data))
				.set('isAuthenticated', true)
		}
	}),
	...pender({
		type: SIGNUP,
		onSuccess: (state, action) => {
			const { data } = action.payload
			storage.setItem("auth", data)
			return state
				.set("auth", fromJS(data))
				.set('isAuthenticated', true)
		}
	}),
	...pender({
		type: LOGOUT,
		onSuccess: (state, action) => {
			storage.removeItem("auth")
			return state
				.set("auth", initialState.get('auth'))
				.set('isAuthenticated', false)
		}
	}),
	[SET_AUTH]: (state, action) => {
		const auth = storage.getItem("auth")
		if (auth) {
			return state.set("auth", fromJS(auth))
				.set("isAuthenticated", true)
		} else {
			return state
		}
	},
	...pender({
		type: REFRES_AUTH,
		onSuccess: (state, action) => {
			const { data } = action.payload
			if (!data) {
				return state
					.set("auth", initialState.get('auth'))
					.set('isAuthenticated', false)
			}
			return state
		}
	})
}, initialState)
