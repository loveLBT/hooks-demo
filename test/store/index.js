import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initCountState = {
	count: 1
}
const initUserState = {
	name: 'Jellal'
}

const ADD = 'ADD'
const UPDATE_USER = 'UPDATE_USER'

const add = (num) => {
	return {
		type: ADD,
		num
	}
}
const addAsync = (num) => {
	return (dispatch, getState) => {
		setTimeout(() => {
			dispatch(add(num))
		}, 2000)
	}
}
const updateUser = (name) => {
	return {
		type: UPDATE_USER,
		name
	}
}

const countReducer = (state = initCountState, action) => {
	switch(action.type) {
		case ADD:
			return {
				...state,
				count: state.count + (action.num || 1)
			}
		default:
			return state
	}
}

const userReducer = (state = initUserState, action) => {
	switch(action.type) {
		case UPDATE_USER: 
			return {
				...state,
				name: action.name
			}
		default: 
			return state
	}
}

const allReducers = combineReducers({
	counter: countReducer, 
	user: userReducer
})

const store = createStore(
	allReducers, 
	{},
	composeWithDevTools(applyMiddleware(reduxThunk))
)

export default store