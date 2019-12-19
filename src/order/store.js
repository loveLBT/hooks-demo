import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

export default createStore(
	combineReducers(reducers),
	{
		departStation: null,
		arriveStation: null,
		seatType: null,
		departDate: Date.now(),
		arriveDate: Date.now(),
		departTimeStr: null,
		arriveTimeStr: null,
		trainNumber: null,
		durationStr: null,
		price: null,
		passengers: [],
		isMenuVisible: false,
		menu: null,
		searchParsed: false,
	},
	applyMiddleware(thunk)
)