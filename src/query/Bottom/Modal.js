import React, { memo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import leftPad from 'left-pad'

import Slider from '../../common/Slider'
import Filters from '../../common/Filters'

const Modal = memo((props) => {
	const {
		visible,
		ticketTypes,
		trainTypes,
		departStations,
		arriveStations,
		checkedTicketTypes,
		checkedTrainTypes,
		checkedDepartStations,
		checkedArriveStations
	} = props

	const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {
		return {
			...checkedTicketTypes
		}
	})
	const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {
		return {
			...checkedTrainTypes
		}
	})
	const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(() => {
		return {
			...checkedDepartStations
		}
	})
	const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => {
		return {
			...checkedArriveStations
		}
	})

	const options = [
		{
			title: '坐席类型',
			filters: ticketTypes,
			checkedMap: localCheckedTicketTypes,
			update: setLocalCheckedTicketTypes
		},
		{
			title: '车次类型',
			filters: trainTypes,
			checkedMap: localCheckedTrainTypes,
			update: setLocalCheckedTrainTypes
		},
		{
			title: '出发车站',
			filters: departStations,
			checkedMap: localCheckedDepartStations,
			update: setLocalCheckedDepartStations
		},
		{
			title: '到达车站',
			filters: arriveStations,
			checkedMap: localCheckedArriveStations,
			update: setLocalCheckedArriveStations
		},
	]
	const filterSliderText = useCallback((value) => {
		return leftPad(value, 2, '0') + ':00'
	}, [])

	if(!visible) {return null}
	return (
		<div className='bottom-modal'>
			<div className='bottom-dialog'>
				<div className='bottom-dialog-content'>
					<div className='title'>
						<span className='rest'>重置</span>
						<span className='ok'>确定</span>
					</div>
					<div className='options'>
						{options.map(option => 
							<div className='option' key={option.title}>
								<h3>{option.title}</h3>
								<Filters 
									{...option}
								/>
							</div>
						)}
						<div className='option'>
							<h3>出发时间</h3>
							<Slider 
								min={0}
								max={24}
								value={[0,8]}
								onFilterText={filterSliderText}
							/>
						</div>
						<div className='option'>
							<h3>到达时间</h3>
							<Slider 
								min={0}
								max={24}
								onFilterText={filterSliderText}
							/>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	)
})

Modal.propTypes = {
	visible: PropTypes.bool.isRequired,
	ticketTypes: PropTypes.array.isRequired,
	trainTypes: PropTypes.array.isRequired,
	departStations: PropTypes.array.isRequired,
	arriveStations: PropTypes.array.isRequired,
	checkedTicketTypes: PropTypes.object.isRequired,
	checkedTrainTypes: PropTypes.object.isRequired,
	checkedDepartStations: PropTypes.object.isRequired,
	checkedArriveStations: PropTypes.object.isRequired
}

export default Modal