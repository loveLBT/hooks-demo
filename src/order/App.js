import React, { useEffect, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import URI from 'urijs'
import moment from 'moment'

import TicketDetail from '../common/TicketDetail'
import Header from '../common/Header'
import Account from './Account'
import Choose from './Choose'
import Passengers from './Passengers'
import Ticket from './Ticket'
import Menu from './Menu'
import './App.css'
import {
	setTrainNumber,
	setDepartStation,
	setArriveStation,
	setDepartDate,
	setSearchParsed,
	setSeatType,
	fetchInitial,
	createAdult,
	createChild,
	removePassenger,
	updatePassenger,
	showGenderMenu,
	showFollowAdultMenu,
	showTicketTypeMenu,
	hideMenu
} from './action'

const App = (props) => {
	const {
		departStation,
		arriveStation,
		seatType,
		departDate,
		arriveDate,
		departTimeStr,
		arriveTimeStr,
		trainNumber,
		durationStr,
		price,
		passengers,
		searchParsed,
		menu,
		isMenuVisible,
		dispatch
	} = props

	const onBack = useCallback(() => {
		window.history.back()
	}, [])

	const passengersCbs = useMemo(() => {
		return bindActionCreators({
			onCreateAdult: createAdult,
			onCreateChild: createChild,
			onRemovePassenger: removePassenger,
			onUpdatePassenger: updatePassenger,
			onShowGenderMenu: showGenderMenu,
			onShowFollowAdultMenu: showFollowAdultMenu,
			onShowTicketTypeMenu: showTicketTypeMenu
		}, dispatch)
	}, [])
	const menuCbs = useMemo(() => {
		return bindActionCreators({
			onHideMenu: hideMenu,
		}, dispatch)
	}, [])
	const chooseCbs = useMemo(() => {
		return bindActionCreators({
			onChooseSeat: updatePassenger
		}, dispatch)
	}, [])

	useEffect(() => {
		const query = URI.parseQuery(window.location.search)
		const { trainNumber, dStation, aStation, date, type } = query

		dispatch(setTrainNumber(trainNumber))
		dispatch(setDepartStation(dStation))
		dispatch(setArriveStation(aStation))
		dispatch(setSeatType(type))
		dispatch(setDepartDate(moment(date).valueOf()))
		dispatch(setSearchParsed(true))
	}, [])

	useEffect(() => {
		if(!searchParsed) {
			return
		}
		const url = new URI('/rest/order')
											.setSearch('dStation', departStation)
											.setSearch('aStation', arriveStation)
											.setSearch('type', seatType)
											.setSearch('date', moment(departDate).format('YYYY-MM-DD'))
											.toString()
		dispatch(fetchInitial(url))							
	}, [searchParsed, departStation, arriveStation, seatType, departDate])

	if(!searchParsed) {
		return null
	}

	return (
		<div className="app">
			<div className="header-wrapper">
				<Header 
					title="订单填写"
					onBack={onBack}
				/>
			</div>
			<div className="detail-wrapper">
				<TicketDetail 
					departDate={departDate}
					arriveDate={arriveDate}
					departTimeStr={departTimeStr}
					arriveTimeStr={arriveTimeStr}
					trainNumber={trainNumber}
					departStation={departStation}
					arriveStation={arriveStation}
					durationStr={durationStr}
          renderMiddle={
            <React.Fragment>
              <span style={{display: 'block'}} className="train-icon"></span>
            </React.Fragment>
          }
				/>
			</div>
			<Ticket 
				price={price}
				type={seatType}
			/>
			<Passengers 
				passengers={passengers}
				{...passengersCbs}
			/>
			{passengers.length > 0 &&
				<Choose 
					passengers={passengers}
					{...chooseCbs}
				/>
			}
			<Account 
				price={price}
				length={passengers.length}
			/>
			<Menu 
				show={isMenuVisible}
				{...menu}
				{...menuCbs}
			/>
		</div>
	)
}

export default connect(
	function mapStateToProps (state) {
		return state
	},
	function mapDispatchToProps (dispatch) {
		return {dispatch}
	}
)(App)