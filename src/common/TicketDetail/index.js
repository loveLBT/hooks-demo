import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './style.css'

const format = (d) => {
	const date = moment(d)

	return date.format('MM-DD') + ' 周五'
}

const TicketDetail = memo((props) => {
	const {
		departDate,
		arriveDate,
		departTimeStr,
		arriveTimeStr,
		trainNumber,
		departStation,
		arriveStation,
		durationStr
	} = props

	const departDateStr = useMemo(() => {
		return format(departDate)
	}, [departDate]) 
	const arriveDateStr = useMemo(() => {
		return format(arriveDate)
	}, [arriveDate]) 

	return (
		<div className='detail'>
			<div className='content'>
				<div className='left'>
					<p className='city'>{departStation}</p>
					<p className='time'>{departTimeStr}</p>
					<p className='date'>{departDateStr}</p>
				</div>
				<div className='middle'>
					<p className='train-name'>{trainNumber}</p>
					<p className="train-mid">
						{props.renderMiddle}
					</p>
					<p className="train-time">耗时：{durationStr}</p>
				</div>
				<div className='right'>
					<p className='city'>{arriveStation}</p>
					<p className='time'>{arriveTimeStr}</p>
					<p className='date'>{arriveDateStr}</p>
				</div>
			</div>
		</div>
	)
})

TicketDetail.propTypes = {
	departDate: PropTypes.number.isRequired,
	arriveDate: PropTypes.number.isRequired,
	departTimeStr: PropTypes.string,
	arriveTimeStr: PropTypes.string,
	trainNumber: PropTypes.string.isRequired,
	departStation: PropTypes.string.isRequired,
	arriveStation: PropTypes.string.isRequired,
	durationStr: PropTypes.string
}

export default TicketDetail