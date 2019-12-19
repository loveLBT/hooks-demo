import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './style.css'

const HighSpeed = (props) => {
	const { highSpeed, onToggle } = props

	return (
		<div className='high-speed'>
			<div className='high-speed-label'>只看高铁/动车</div>
			<div className='high-speed-switch' onClick={onToggle}>
				<input 
					type='hidden' 
					name='highSpeed'
					value={highSpeed}
				/>
				<div className={classnames('high-speed-track', {checked: highSpeed})}>
					<span className={classnames('high-speed-handle', {checked: highSpeed})}></span>
				</div>
			</div>
		</div>
	)
}

HighSpeed.propTypes = {
	highSpeed: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired
}

export default HighSpeed