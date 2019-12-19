import React, { useCallback, useEffect, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import URI from 'urijs'
import moment from 'moment'

import useNav from  '../hooks/useNav'
import d from '../commonFuncs/d'
import Header from '../common/Header'
import Nav from '../common/Nav'
import List from './List'
import Bottom from './Bottom'
import { 
	setFrom,
	setTo,
	setDepartDate,
	setHighSpeed,
	setSearchParsed,

	setTrainList,
	setTicketTypes,
	setTrainTypes,
	setDepartStations,
	setArriveStations,

	prevDepartDate,
	nextDepartDate,

	toggleHighSpeed,
	toggleOrderType,
	toggleOnlyTickets,
	toggleIsFiltersVisible
}	from './action'

import './App.css'

const App = (props) => {
	const {
		from,
		to,
		departDate,
		highSpeed,
		searchParsed,
		orderType,
		onlyTickets,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations,
		departTimeStart,
		departTimeEnd,
		arriveTimeStart,
		arriveTImeEnd,
		trainList,
		trainTypes,
		ticketTypes,
		departStations,
		arriveStations,
		isFiltersVisible,
		dispatch 
	} = props

	const onBack = useCallback(() => {
		window.history.back()
	}, [])

	const { navCbs, isPrevDisabled, isNextDisabled } = useNav(departDate, dispatch, prevDepartDate, nextDepartDate)
	const bottomCbs = useMemo(() => {
		return bindActionCreators({
			toggleOrderType,
			toggleHighSpeed,
			toggleOnlyTickets,
			toggleIsFiltersVisible
		}, dispatch)
	}, [])

	useEffect(() => {
		const query = URI.parseQuery(window.location.search)
		const { from, to, date, highSpeed } = query

		dispatch(setFrom(from))
		dispatch(setTo(to))
		dispatch(setDepartDate(d.h0(moment(date).valueOf())))
		dispatch(setHighSpeed(highSpeed === 'true'))

		dispatch(setSearchParsed(true))
	}, [])

	useEffect(() => {
		if(!searchParsed) {
			return 
		}
		const url = new URI('/rest/query')
										.setSearch('from', from)
										.setSearch('to', to)
										.setSearch('departDate', departDate)
										.setSearch('highSpeed', highSpeed)
										.setSearch('searchParsed', searchParsed)
										.setSearch('orderType', orderType)
										.setSearch('onlyTickets', onlyTickets)
										.setSearch('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
										.setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
										.setSearch('checkedDepartStations', Object.keys(checkedDepartStations).join())
										.setSearch('checkedArriveStations', Object.keys(checkedArriveStations).join())
										.setSearch('departTimeStart', departTimeStart)
										.setSearch('departTimeEnd', departTimeEnd)
										.setSearch('arriveTimeStart', arriveTimeStart)
										.setSearch('arriveTImeEnd', arriveTImeEnd)
										.toString()

		fetch(url)
			.then(res => res.json())
			.then(result => {
				const {
					dataMap: {
						directTrainInfo: {
							trains,
							filter: {
								ticketType,
								trainType,
								depStation,
								arrStation
							}
						}
					}
				} = result
				dispatch(setTrainList(trains))
				dispatch(setTicketTypes(ticketType))
				dispatch(setTrainTypes(trainType))
				dispatch(setDepartStations(depStation))
				dispatch(setArriveStations(arrStation))
			})
	}, [
		from,
		to,
		departDate,
		highSpeed,
		searchParsed,
		orderType,
		onlyTickets,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations,
		departTimeStart,
		departTimeEnd,
		arriveTimeStart,
		arriveTImeEnd
	])

	if(!searchParsed) {
		return null
	}

	return (
		<div>
			<div className='header-wrapper'>
				<Header 
					title={`${from} -> ${to} `}
					onBack={onBack}
				/>
			</div>
			<Nav 
				date={departDate}
				isPrevDisabled={isPrevDisabled}
				isNextDisabled={isNextDisabled}
				{...navCbs}
			/>
			<List 
				list={trainList}
			/>
			<Bottom 
				highSpeed={highSpeed}
				orderType={orderType}
				onlyTickets={onlyTickets}
				isFiltersVisible={isFiltersVisible}
				ticketTypes={ticketTypes}
				trainTypes={trainTypes}
				departStations={departStations}
				arriveStations={arriveStations}
				checkedTicketTypes={checkedTicketTypes}
				checkedTrainTypes={checkedTrainTypes}
				checkedDepartStations={checkedDepartStations}
				checkedArriveStations={checkedArriveStations}
				{...bottomCbs}
			/>
		</div>
	)
}

export default connect(
	function mapStateToProps(state) {
		return state
	},
	function mapDispatchToProps(dispatch) {
		return {dispatch}
	}
)(App)