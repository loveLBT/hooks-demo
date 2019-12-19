export const ACTION_SET_DEPART_STATION = 'ACTION_SET_DEPART_STATION'
export const ACTION_SET_ARRIVE_STATION = 'ACTION_SET_ARRIVE_STATION'
export const ACTION_SET_SEAT_TYPE = 'ACTION_SET_SEAT_TYPE'
export const ACTION_SET_DEPART_DATE = 'ACTION_SET_DEPART_DATE'
export const ACTION_SET_ARRIVE_DATE = 'ACTION_SET_ARRIVE_DATE'
export const ACTION_SET_DEPART_TIME_STR = 'ACTION_SET_DEPART_TIME_STR'
export const ACTION_SET_ARRIVE_TIME_STR = 'ACTION_SET_ARRIVE_TIME_STR'
export const ACTION_SET_TRAINNUMBER = 'ACTION_SET_TRAINNUMBER'
export const ACTION_SET_DURATION_STR = 'ACTION_SET_DURATION_STR'
export const ACTION_SET_PRICE = 'ACTION_SET_PRICE'
export const ACTION_SET_PASSENGERS = 'ACTION_SET_PASSENGERS'
export const ACTION_SET_IS_MENU_VISIBLE = 'ACTION_SET_IS_MENU_VISIBLE'
export const ACTION_SET_MENU = 'ACTION_SET_MENU'
export const ACTION_SET_SEARCH_PARSED = 'ACTION_SET_SEARCH_PARSED'

export const setDepartStation = (departStation) => {
	return {
		type: ACTION_SET_DEPART_STATION,
		payload: departStation
	}
}
export const setArriveStation = (arriveStation) => {
	return {
		type: ACTION_SET_ARRIVE_STATION,
		payload: arriveStation
	}
}
export const setSeatType = (seatType) => {
	return {
		type: ACTION_SET_SEAT_TYPE,
		payload: seatType
	}
}
export const setDepartDate = (departDate) => {
	return {
		type: ACTION_SET_DEPART_DATE,
		payload: departDate
	}
}
export const setArriveDate = (arriveDate) => {
	return {
		type: ACTION_SET_ARRIVE_DATE,
		payload: arriveDate
	}
}
export const setDepartTimeStr = (departTimeStr) => {
	return {
		type: ACTION_SET_DEPART_TIME_STR,
		payload: departTimeStr
	}
}
export const setArriveTimeStr = (arriveTimeStr) => {
	return {
		type: ACTION_SET_ARRIVE_TIME_STR,
		payload: arriveTimeStr
	}
}
export const setTrainNumber = (trainNumber) => {
	return {
		type: ACTION_SET_TRAINNUMBER,
		payload: trainNumber
	}
}
export const setDurationStr = (durationStr) => {
	return {
		type: ACTION_SET_DURATION_STR,
		payload: durationStr
	}
}
export const setPrice = (price) => {
	return {
		type: ACTION_SET_PRICE,
		payload: price
	}
}
export const setPassengers = (passengers) => {
	return {
		type: ACTION_SET_PASSENGERS,
		payload: passengers
	}
}
export const setIsMenuVisible = (isMenuVisible) => {
	return {
		type: ACTION_SET_IS_MENU_VISIBLE,
		payload: isMenuVisible
	}
}
export const setMenu = (menu) => {
	return {
		type: ACTION_SET_MENU,
		payload: menu
	}
}
export const setSearchParsed = (searchParsed) => {
	return {
		type: ACTION_SET_SEARCH_PARSED,
		payload: searchParsed
	}
}

export const fetchInitial = (url) => {
	return (dispatch) => {
		fetch(url)
			.then(response => response.json())
			.then(data => {
				const {
					departTimeStr,
					arriveTimeStr,
					arriveDate,
					durationStr,
					price
				} = data

				dispatch(setDepartTimeStr(departTimeStr))
				dispatch(setArriveTimeStr(arriveTimeStr))
				dispatch(setArriveDate(arriveDate))
				dispatch(setDurationStr(durationStr))
				dispatch(setPrice(price))
			})
	}
}

let passengerId = 0

export const createAdult = () => {
	return (dispatch, getState) => {
		const { passengers } = getState()

		for(let passenger of passengers) {
			for(let key in passenger) {
				if(!passenger[key]) {
					return
				}
			}
		}

		dispatch(setPassengers([
			...passengers,
			{
				id: ++passengerId,
				name: '',
				ticketType: 'adult',
				licenceNo: '',
				seat: 'Z'
			}
		]))
	}
}
export const createChild = () => {
	return (dispatch, getState) => {
		const { passengers } = getState()
		let adultId = null

		for(let passenger of passengers) {
			for(let key in passenger) {
				if(!passenger[key]) {
					return 
				}
			}

			if(passenger['ticketType'] === 'adult') {
				adultId = passenger['id']
			}
		}

		if(!adultId) {
			alert('请先输入成人的用户信息')
			return 
		}

		dispatch(setPassengers([
			...passengers,
			{
				id: ++passengerId,
				name: '',
				ticketType: 'child',
				gender: 'male',
				birthday: '',
				followAdult: adultId,
				seat: 'Z'
			}
		]))
	}
}

export const removePassenger = (id) => {
	return (dispatch, getState) => {
		const { passengers } = getState()

		const newPassengers = passengers.filter(passenger => passenger.id !== id && passenger.followAdult !== id)

		dispatch(setPassengers(newPassengers))
	}
}
export const updatePassenger = (id, data, keysToBeRemoved=[]) => {
	return (dispatch, getState) => {
		const { passengers } = getState()
		for(let i = 0; i < passengers.length; i++) {
			if(passengers[i].id === id) {
				const newPassengers = [...passengers]

				newPassengers[i] = Object.assign({}, passengers[i], data)

				for(let key of keysToBeRemoved) {
					delete newPassengers[i][key]
				}

				dispatch(setPassengers(newPassengers))
				break
			}
		} 
	}
}
export const hideMenu = () => {
	return setIsMenuVisible(false)
}
export const showMenu = (menu) => {
	return (dispatch) => {
		dispatch(setIsMenuVisible(true))
		dispatch(setMenu(menu))
	}
}
export const showGenderMenu = (id) => {
	return (dispatch, getState) => {
		const { passengers } = getState()
		const passenger = passengers.find(passenger => passenger.id === id)

		if(!passenger) {
			return
		}

		dispatch(showMenu({
			onSelect: (gender) => {
				dispatch(updatePassenger(
					id,
					{gender}
				))
				dispatch(hideMenu())
			},
			options: [
				{
					label: '男',
					value: 'male',
					active: passenger.gender === 'male'
				},
				{
					label: '女',
					value: 'female',
					active: passenger.gender === 'female'
				}
			]
		}))
	}
}
export const showFollowAdultMenu = (id) => {
	return (dispatch, getState) => {
		const { passengers } = getState()
		const passenger = passengers.find(passenger => passenger.id === id)

		if(!passenger) {
			return
		}

		dispatch(showMenu({
			onSelect: (followAdult) => {
				dispatch(updatePassenger(
					id,
					{followAdult}
				))
				dispatch(hideMenu())
			},
			options: passengers
								.filter(passenger => passenger.ticketType === 'adult')
								.map(adult => {
									return {
										label: adult.name,
										value: adult.id,
										active: passenger.followAdult === adult.id
									}
								})
		}))
	}
}
export const showTicketTypeMenu = (id) => {
	return (dispatch, getState) => {
		const { passengers } = getState()
		const passenger = passengers.find(passenger => passenger.id === id)

		if(!passenger) {
			return
		}

		dispatch(showMenu({
			onSelect: (ticketType) => {
				if(ticketType === 'adult') {
					dispatch(updatePassenger(
						id,
						{ticketType, licenceNo: ''},
						['gender', 'birthday', 'followAdult']
					))
				}else {
					const adult = passengers.find(passenger => passenger.id !== id && passenger.ticketType === 'adult')
					if(adult) {
						dispatch(updatePassenger(
							id, 
							{ticketType, birthday: '', gender: 'male', followAdult: adult.id},
							['licenceNo']
						))
					}else {
						alert('没有同程的成人')
					}
				}
				dispatch(hideMenu())
			},
			options: [
				{
					label: '成人',
					value: 'adult',
					active: passenger.ticketType === 'adult'
				},
				{
					label: '儿童',
					value: 'child',
					active: passenger.ticketType === 'child'
				}
			]
		}))
	}
}