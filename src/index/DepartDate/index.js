import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import d from '../../commonFuncs/d'
import './style.css'

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

const DepartDate = (props) => {
	const { time, onClick } = props
	
	const h0OfDepart = d.h0(time)
  const departDate = new Date(h0OfDepart)
	const departDateString = moment(h0OfDepart).format('YYYY-MM-DD')

	const isToday = h0OfDepart === d.h0()

	const weekString = '周' + WEEK_DAYS[departDate.getDay()] + (isToday ? '(今天)' : '')	

	return (
		<div className='depart-date' onClick={onClick}>
			<input 
				type='hidden'
				name='date'
				value={departDateString}
			/>
			{departDateString}
			<span className='depart-week'>{weekString}</span>
		</div>
	)
}

DepartDate.propTypes = {
	time: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
}

export default DepartDate