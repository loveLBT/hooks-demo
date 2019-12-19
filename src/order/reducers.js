import * as actionTypes from './action'

export default {
	departStation: (state = null, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_DEPART_STATION :
				return payload
			default:
				return state
		}
	},
	arriveStation: (state = null, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_ARRIVE_STATION :
				return payload
			default:
				return state
		}
	},
	seatType: (state = null, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_SEAT_TYPE :
				return payload
			default:
				return state
		}
	},
	departDate: (state = Date.now(), action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_DEPART_DATE :
				return payload
			default:
				return state
		}
	},
	arriveDate: (state = Date.now(), action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_ARRIVE_DATE :
				return payload
			default:
				return state
		}
	},
	departTimeStr: (state = null, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_DEPART_TIME_STR :
				return payload
			default:
				return state
		}
	},
	arriveTimeStr: (state = null, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_ARRIVE_TIME_STR :
				return payload
			default:
				return state
		}
	},
	trainNumber: (state = null, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_TRAINNUMBER :
				return payload
			default:
				return state
		}
	},
	durationStr: (state = null, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_DURATION_STR :
				return payload
			default:
				return state
		}
	},
	price: (state = null, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_PRICE :
				return payload
			default:
				return state
		}
	},
	passengers: (state = [], action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_PASSENGERS :
				return payload
			default:
				return state
		}
	},
	isMenuVisible: (state = false, action) => {
		const { type, payload } = action
		switch(type) {
			case actionTypes.ACTION_SET_IS_MENU_VISIBLE :
				return payload
			default: 
				return state
		}
	},
	menu: (state = false, action) => {
		const { type, payload } = action
		switch(type) {
			case actionTypes.ACTION_SET_MENU :
				return payload
			default: 
				return state
		}
	},
	searchParsed: (state = false, action) => {
		const { type, payload } = action

		switch(type) {
			case actionTypes.ACTION_SET_SEARCH_PARSED :
				return payload
			default:
				return state
		}
	}
}