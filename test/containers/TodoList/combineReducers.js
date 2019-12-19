const combineReducers = (reducers) => {
	return (state, action) => {
		let changed = {}

		for(let key in reducers) {
			changed[key] = reducers[key](state[key], action)
		}

		return {
			...state,
			...changed
		}
	}
}

export default combineReducers