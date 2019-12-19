import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
import {
	ORDER_DEPART
} from './constants'

export default createStore(
	combineReducers(reducers),
	{
		from: null,
		to: null,
		departDate: Date.now(),
		highSpeed: false,
		trainList: [],
		orderType: ORDER_DEPART,
		onlyTickets: false,
		ticketTypes: [],
		checkedTicketTypes: {},
		trainTypes: [],
		checkedTrainTypes: {},
		departStations: [],
		checkedDepartStations: {},
		arriveStations: [],
		checkedArriveStations: {},
		departTimeStart: 0,
		departTimeEnd: 24,
		arriveTimeStart: 0,
		arriveTImeEnd: 24,
		isFiltersVisible: false,
		searchParsed: false
	},
	applyMiddleware(thunk)
)