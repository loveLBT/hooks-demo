import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Modal from './Modal'
import { ORDER_DEPART } from '../constants'
import './style.css'

const Bottom = memo((props) => {
	const {
		orderType,
		highSpeed,
		onlyTickets,
		isFiltersVisible,
		toggleOrderType,
		toggleHighSpeed,
		toggleOnlyTickets,
		toggleIsFiltersVisible,

		ticketTypes,
		trainTypes,
		departStations,
		arriveStations,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations
	} = props

	return (
		<div className='bottom'>
			<div className='bottom-filters'>
				<span 
					className='item'
					onClick={toggleOrderType}
				>
					<i className='icon'>&#xf065;</i>
					{orderType === ORDER_DEPART ? '出发 早->晚' : '耗时 短->长'}
				</span>
				<span 
					className={classnames('item', {'item-on': highSpeed})}
					onClick={toggleHighSpeed}
				>
					<i className='icon'>{highSpeed ? '\uf43f' : '\uf43e'}</i>
					只看高铁动车
				</span>
				<span 
					className={classnames('item', {'item-on': onlyTickets})}
					onClick={toggleOnlyTickets}
				>
					<i className='icon'>{onlyTickets ? '\uf43d' : '\uf43c'}</i>
					只看有票
				</span>
				<span 
					className={classnames('item', {'item-on': isFiltersVisible})}
					onClick={toggleIsFiltersVisible}
				>
					<i className='icon'>{'\uf0f7'}</i>
					综合筛选
				</span>
			</div>
			<Modal 
				visible={isFiltersVisible}
				ticketTypes={ticketTypes}
				trainTypes={trainTypes}
				departStations={departStations}
				arriveStations={arriveStations}
				checkedTicketTypes={checkedTicketTypes}
				checkedTrainTypes={checkedTrainTypes}
				checkedDepartStations={checkedDepartStations}
				checkedArriveStations={checkedArriveStations}
			/>
		</div>
	)
})

Bottom.propTypes = {
	orderType: PropTypes.number.isRequired,
	highSpeed: PropTypes.bool.isRequired,
	onlyTickets: PropTypes.bool.isRequired,
	isFiltersVisible: PropTypes.bool.isRequired,
	toggleOrderType: PropTypes.func.isRequired,
	toggleHighSpeed: PropTypes.func.isRequired,
	toggleOnlyTickets: PropTypes.func.isRequired,
	toggleIsFiltersVisible: PropTypes.func.isRequired,

	ticketTypes: PropTypes.array.isRequired,
	trainTypes: PropTypes.array.isRequired,
	departStations: PropTypes.array.isRequired,
	arriveStations: PropTypes.array.isRequired,
	checkedTicketTypes: PropTypes.object.isRequired,
	checkedTrainTypes: PropTypes.object.isRequired,
	checkedDepartStations: PropTypes.object.isRequired,
	checkedArriveStations: PropTypes.object.isRequired
}

export default Bottom