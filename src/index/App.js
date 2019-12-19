import React, { useCallback, useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../common/Header'
import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import { 
	exchangeFromTo, 
	showCitySelector, 
	hideCitySelector, 
	fetchCityData,
	setSelectedCity,
	showDateSelector,
	setDepartDate ,
	hideDateSelector,
	toggleHighSpeed
} from './action'
import './App.css'

const App = (props) => {
	const { 
		from, 
		to,
		isCitySelectorVisible,
		cityData,
		isLoadingCityData,
		departDate,
		isDateSelectorVisible,
		highSpeed
	} = useSelector(state => state)
	const dispatch = useDispatch()

	const onBack = useCallback(() => {
		window.history.back()
	}, [])
	const journeyCbs = useMemo(() => {
		return bindActionCreators({
			exchangeFromTo,
			showCitySelector
		}, dispatch)
	}, [])
	const citySelectorCbs = useMemo(() => {
		return bindActionCreators({
			onBack: hideCitySelector,
			fetchCityData,
			onSelect: setSelectedCity
		}, dispatch)
	}, [])
	const departDateCbs = useMemo(() => {
		return bindActionCreators({
			onClick: showDateSelector
		}, dispatch)
	}, [])
	const dateSelectorCbs = useMemo(() => {
		return bindActionCreators({
			onSelect: setDepartDate,
			onBack: hideDateSelector
		}, dispatch)
	}, [])
	const highSpeedCbs = useMemo(() => {
		return bindActionCreators({
			onToggle: toggleHighSpeed
		}, dispatch)
	}, [])

	return (
		<div>
			<div className='header-wrapper'>
				<Header title='火车票' onBack={onBack} />
			</div>
			<form action='./query.html' className='form'>
				<Journey 
					from={from}
					to={to}
					{...journeyCbs}
				/>
				<DepartDate 
					time={departDate}
					{...departDateCbs}
				/>
				<HighSpeed 
					highSpeed={highSpeed}
					{...highSpeedCbs}
				/>
				<Submit />
			</form>
			<CitySelector 
				show={isCitySelectorVisible}
				cityData={cityData}
				isLoading={isLoadingCityData}
				{...citySelectorCbs}
			/>
			<DateSelector 
				show={isDateSelectorVisible}
				{...dateSelectorCbs}
			/>
		</div>
	)
}

export default App

/*export default connect(
	function mapStateToProps(state) {
		return state
	}, 
	function mapDispatchToProps(dispatch) {
		return {dispatch}
	}
)(App)*/