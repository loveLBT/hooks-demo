import { 
	ORDER_DEPART,
	ORDER_DURATION
} from './constants'
import d from '../commonFuncs/d'

export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED'
export const ACTION_SET_TRAIN_LIST = 'SET_TRAIN_LIST'
export const ACTION_SET_ORDER_TYPE = 'SET_ORDER_TYPE'
export const ACTION_SET_ONLY_TICKETS = 'SET_ONLY_TICKETS'
export const ACTION_SET_TICKET_TYPES = 'SET_TICKET_TYPES'
export const ACTION_SET_CHECKED_TICKET_TYPES = 'SET_CHECKED_TICKET_TYPES'
export const ACTION_SET_TRAIN_TYPES = 'SET_TRAIN_TYPES'
export const ACTION_SET_CHECKED_TRAIN_TYPES = 'SET_CHECKED_TRAIN_TYPES'
export const ACTION_SET_DEPART_STATIONS = 'SET_DEPART_STATIONS'
export const ACTION_SET_CHECKED_DEPART_STATIONS = 'SET_CHECKED_DEPART_STATIONS'
export const ACTION_SET_ARRIVE_STATIONS = 'SET_ARRIVE_STATIONS'
export const ACTION_SET_CHECKED_ARRIVE_STATIONS = 'SET_CHECKED_ARRIVE_STATIONS'
export const ACTION_SET_DEPART_TIME_START = 'SET_DEPART_TIME_START'
export const ACTION_SET_DEPART_TIME_END = 'SET_DEPART_TIME_END'
export const ACTION_SET_ARRIVE_TIME_START = 'SET_ARRIVE_TIME_START'
export const ACTION_SET_ARRIVE_TIME_END = 'SET_ARRIVE_TIME_END'
export const ACTION_SET_IS_FILTERS_VISIBLE = 'SET_IS_FILTERS_VISIBLE'
export const ACTION_SET_SEARCH_PARSED = 'SET_SEARCH_PARSED'

export const setFrom = (from) => {
	return {
		type: ACTION_SET_FROM,
		payload: from
	}
}
export const setTo = (to) => {
	return {
		type: ACTION_SET_TO,
		payload: to
	}
}
export const setDepartDate = (departDate) => {
	return {
		type: ACTION_SET_DEPART_DATE,
		payload: departDate
	}
}
export const prevDepartDate = () => {
	return (dispatch, getState) => {
		const { departDate } = getState()
		if(d.h0(departDate) <= d.h0()) {return}
		dispatch(setDepartDate(d.h0(departDate) - 24 * 60 * 60 * 1000))
	}
}
export const nextDepartDate = () => {
	return (dispatch, getState) => {
		const { departDate } = getState()
		if(d.h0(departDate) - 20 * 24 * 60 *60 * 1000 > d.h0()) {return}
		dispatch(setDepartDate(d.h0(departDate) + 24 * 60 * 60 * 1000))
	}
}
export const setHighSpeed = (highSpeed) => {
	return {
		type: ACTION_SET_HIGH_SPEED,
		payload: highSpeed
	}
}
export const toggleHighSpeed = () => {
	return (dispatch, getState) => {
		const { highSpeed } = getState()
		dispatch(setHighSpeed(!highSpeed))
	}
}
export const setTrainList = (trainList) => {
	return {
		type: ACTION_SET_TRAIN_LIST,
		payload: trainList
	}
}
export const toggleOrderType = () => {
	return (dispatch, getState) => {
		const { orderType } = getState()
		if(orderType === ORDER_DEPART) {
			dispatch({
				type: ACTION_SET_ORDER_TYPE,
				payload: ORDER_DURATION
			})
		}else {
			dispatch({
				type: ACTION_SET_ORDER_TYPE,
				payload: ORDER_DEPART
			})
		}
	}
}
export const toggleOnlyTickets = (onlyTickets) => {
	return (dispatch, getState) => {
		const { onlyTickets } = getState()
		dispatch({
			type: ACTION_SET_ONLY_TICKETS,
			payload: !onlyTickets
		})
	}
}
export const setTicketTypes = (ticketTypes) => {
	return {
		type: ACTION_SET_TICKET_TYPES,
		payload: ticketTypes
	}
}
export const setCheckedTicketTypes = (checkedTicketTypes) => {
	return {
		type: ACTION_SET_CHECKED_TICKET_TYPES,
		payload: checkedTicketTypes
	}
}
export const setTrainTypes = (trainTypes) => {
	return {
		type: ACTION_SET_TRAIN_TYPES,
		payload: trainTypes
	}
}
export const setCheckedTrainTypes = (checkedTrainTypes) => {
	return {
		type: ACTION_SET_CHECKED_TRAIN_TYPES,
		payload: checkedTrainTypes
	}
}
export const setDepartStations = (departStations) => {
	return {
		type: ACTION_SET_DEPART_STATIONS,
		payload: departStations
	}
}
export const setCheckedDepartStations = (checkedDepartStations) => {
	return {
		type: ACTION_SET_CHECKED_DEPART_STATIONS,
		payload: checkedDepartStations
	}
}
export const setArriveStations = (arriveStations) => {
	return {
		type: ACTION_SET_ARRIVE_STATIONS,
		payload: arriveStations
	}
}
export const setCheckedArriveStations = (checkedArriveStations) => {
	return {
		type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
		payload: checkedArriveStations
	}
}
export const setDepartTimeStart = (departTimeStart) => {
	return {
		type: ACTION_SET_DEPART_TIME_START,
		payload: departTimeStart
	}
}
export const setDepartTimeEnd = (departTimeEnd) => {
	return {
		type: ACTION_SET_DEPART_TIME_END,
		payload: departTimeEnd
	}
}
export const setArriveTimeStart = (arriveTimeStart) => {
	return {
		type: ACTION_SET_ARRIVE_TIME_START,
		payload: arriveTimeStart
	}
}
export const setArriveTImeEnd = (arriveTImeEnd) => {
	return {
		type: ACTION_SET_ARRIVE_TIME_END,
		payload: arriveTImeEnd
	}
}
export const toggleIsFiltersVisible = () => {
	return (dispatch, getState) => {
		const { isFiltersVisible } = getState()

		dispatch({
			type: ACTION_SET_IS_FILTERS_VISIBLE,
			payload: !isFiltersVisible
		})
	}
}
export const setSearchParsed = (searchParsed) => {
	return {
		type: ACTION_SET_SEARCH_PARSED,
		payload: searchParsed
	}
}
