import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import leftPad from 'left-pad'
import URI from 'urijs'
import moment from 'moment'

import './style.css'

const ScheduleRow = memo((props) => {
	const {
		index,
		station,
		arriveTime,
		departTime,
		stay,

		isStartStation,
		isEndStation,
		isDepartStation,
		isArriveStation,
		beforeDepartStation,
		afterArriveStation
	} = props

	return (
		<li>
			<div 
				className={classnames('icon', {'icon-red': isDepartStation || isArriveStation})}
			>
				{isDepartStation ? '出' : isArriveStation ? '到'	: leftPad(index, 2, '0')}
			</div>
			<div className={classnames('row', {grey: beforeDepartStation || afterArriveStation})}>
				<span className={classnames('station', {red: isArriveStation || isDepartStation})}>
					{station}
				</span>
				<span className={classnames('arrtime', {red: isArriveStation})}>
					{isStartStation ? '始发站' : arriveTime}
				</span>
				<span className={classnames('deptime', {red: isDepartStation})}>
					{isEndStation ? '终点站' : departTime}
				</span>
				<span className='stoptime'>
					{isStartStation || isEndStation ? '-' : stay + '分'}
				</span>
			</div>
		</li>
	)
})

ScheduleRow.propTypes = {

}

const Schedule = memo((props) => {
	const {
		date,
		trainNumber,
		departStation,
		arriveStation,
	} = props
	const [scheduleList, setScheduleList] = useState([])

	useEffect(() => {
		const url = new URI('/rest/schedule')
			.setSearch('trainNumber', trainNumber)
			.setSearch('departStation', departStation)
			.setSearch('arriveStation', arriveStation)
			.setSearch('date', moment(date).format('YYYY-MM-DD'))
			.toString()

			fetch(url)
				.then(response => response.json())
				.then(data => {
					let departRow
					let arriveRow

					data.forEach((row, index) => {
						if(!departRow) {
							if(row.station === departStation) {
								departRow = Object.assign(row, {
									beforeDepartStation: false,
									isDepartStation: true,
									afterArriveStation: false,
									isArriveStation: false
								})
							}else {
								Object.assign(row, {
									beforeDepartStation: true,
									isDepartStation: false,
									afterArriveStation: false,
									isArriveStation: false
								})
							}
						}else if(!arriveRow) {
							if(row.station === arriveStation) {
								arriveRow = Object.assign(row, {
									beforeDepartStation: false,
									isDepartStation: false,
									afterArriveStation: false,
									isArriveStation: true
								})
							}else {
								Object.assign(row, {
									beforeDepartStation: false,
									isDepartStation: false,
									afterArriveStation: false,
									isArriveStation: false
								})
							}
						}else {
							Object.assign(row, {
									beforeDepartStation: false,
									isDepartStation: false,
									afterArriveStation: true,
									isArriveStation: false
								})
						}

						Object.assign(row, {
							isStartStation: index === 0,
							isEndStation: index === data.length - 1
						})

						setScheduleList(data)
					})
				}) 
	}, [date, trainNumber, departStation, arriveStation])

	return (
		<div className='schedule'>
			<div className="dialog">
				<h1>列车时刻表</h1>
				<div className='head'>
					<span className="station">车站</span>
					<span className="deptime">到达</span>
					<span className="arrtime">发车</span>
					<span className="stoptime">停留时间</span>
				</div>
				<ul>
					{scheduleList.map((schedule, index) => 
						<ScheduleRow
							key={schedule.station} 
							index={index + 1}
							{...schedule}
						/>
					)}
				</ul>
			</div>
		</div>
	)
})

Schedule.propTypes = {
	date: PropTypes.number.isRequired,
	trainNumber: PropTypes.string.isRequired,
	departStation: PropTypes.string.isRequired,
	arriveStation: PropTypes.string.isRequired
}

export default Schedule