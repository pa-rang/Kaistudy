import { createAction, handleActions } from "redux-actions"
import { Map, fromJS } from "immutable"
import { pender } from "redux-pender"
import get from "lodash.get"

import * as API from "../../lib/api"

// action types
const SIGNIN = "app/SIGNIN"
const SIGNUP = "app/SIGNUP"

//action creators
export const signIn = createAction(SIGNIN, API.signIn)
export const signUp = createAction(SIGNUP, API.signUp)

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
	})
}, initialState)
