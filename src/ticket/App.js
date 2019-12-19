import React, { useEffect, useCallback, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import URI from 'urijs'
import moment from 'moment'

import { CandidateContext } from './context'
import Candidate from './Candidate'
import TicketDetail from '../common/TicketDetail'
import Nav from '../common/Nav'
import Header from '../common/Header' 
import './App.css'
import useNav from '../hooks/useNav'
import d from '../commonFuncs/d'
import {
	setDepartStation,
	setArriveStation,
	setTrainNumber,
	setDepartDate,
	prevDepartDate,
	nextDepartDate,
	
	setSearchParsed,
	setDepartTimeStr,
	setArriveTimeStr,
	setArriveDate,
	setDurationStr,
	setTickets,

	toggleIsScheduleVisible
} from './action'

const Schedule = lazy(() => import('./Schedule'))

const App = (props) => {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch
  } = props

  const onBack = useCallback(() => {
  	window.history.back()
  }, [])
  const { navCbs, isPrevDisabled, isNextDisabled } = useNav(departDate, dispatch, prevDepartDate, nextDepartDate)
  const onToggleIsSchedule = () => {
    dispatch(toggleIsScheduleVisible())
  }

  useEffect(() => {
  	const query = URI.parseQuery(window.location.search)
  	const { aStation, dStation, trainNumber, date } = query
  
  	dispatch(setDepartStation(dStation))
  	dispatch(setArriveStation(aStation))
  	dispatch(setTrainNumber(trainNumber))
  	dispatch(setDepartDate(d.h0(moment(date).valueOf())))

  	dispatch(setSearchParsed(true))
  }, [])

  useEffect(() => {
  	document.title = trainNumber
  }, [trainNumber])

  useEffect(() => {
  	if(!searchParsed) {
  		return
  	}
  	const url = new URI('/rest/ticket')
  								.setSearch('date', moment(departDate).format('YYYY-MM-DD'))
  								.setSearch('trainNumber', trainNumber)
  								.toString()
  	fetch(url)
  		.then(response => response.json())
  		.then(res => {
  			const { detail, candidates } = res
  			const {
  				departTimeStr,
  				arriveTimeStr,
  				arriveDate,
  				durationStr
  			} = detail
  			dispatch(setDepartTimeStr(departTimeStr))
				dispatch(setArriveTimeStr(arriveTimeStr))
				dispatch(setArriveDate(arriveDate))
				dispatch(setDurationStr(durationStr))
				dispatch(setTickets(candidates))
  			
  		})
  }, [searchParsed, departDate, trainNumber])

  if(!searchParsed) {
  	return null
  }

  return (
    <div className='app'>
    	<div className='header-wrapper'>
    		<Header 
					title={trainNumber}
					onBack={onBack}
				/>
    	</div>
    	<div className='nav-wrapper'>
				<Nav 
					date={departDate}
					isPrevDisabled={isPrevDisabled}
					isNextDisabled={isNextDisabled}
					{...navCbs}
				/>
			</div>
			<div className='detail-wrapper'>
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
              <span className='left'></span>
              <span className='schedule' onClick={onToggleIsSchedule}>时刻表</span>
              <span className='right'></span>
            </React.Fragment>
          }
				/>
			</div>
    	<div className='ticket-wrapper'>
    		<CandidateContext.Provider
    			value={{
    				trainNumber, 
    				dStation: departStation, 
    				aStation: arriveStation, 
    				date: moment(departDate).format('YYYY-MM-DD')
    			}}
    		>
    			<Candidate 
		    		tickets={tickets}
		    	/>
    		</CandidateContext.Provider>
    		
    	</div>
    	{isScheduleVisible && 
    		<div className="mask" onClick={() => dispatch(toggleIsScheduleVisible())}>
    			<Suspense fallback={<div>loading...</div>}>
    				<Schedule 
			    		date={departDate}
			    		trainNumber={trainNumber}
			    		departStation={departStation}
			    		arriveStation={arriveStation}
			    	/>
    			</Suspense>
	    	</div>
    	}
    	
		</div>
  )
}

export default connect(
  function mapStateToProps(state) {
    return state
  },
  function mapDispatchProps(dispatch) {
    return { dispatch }
  }
)(App)