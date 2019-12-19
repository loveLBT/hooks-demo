import React, { useMemo, memo } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import moment from 'moment'

import './style.css'

const Nav = memo((props) => {
	const { 
		date,
		isPrevDisabled,
		isNextDisabled,
		onPrev,
		onNext
	} = props
	
	const dateString = useMemo(() => {
		const m = moment(date)
		return m.format('M月D日 ')
	}, [date])

	return (
		<div className='nav'>
			<span 
				className={classnames('nav-prev', {'nav-disabled': isPrevDisabled})}
				onClick={onPrev}
			>
				前一天
			</span>
			<span className='nav-current'>{dateString}</span>
			<span 
				className={classnames('nav-next', {'nav-disabled': isNextDisabled})}
				onClick={onNext}
			>
				后一天
			</span>
		</div>
	)
})

Nav.propTypes = {
	date: PropTypes.number.isRequired,
	isPrevDisabled: PropTypes.bool.isRequired,
	isNextDisabled: PropTypes.bool.isRequired,
	onPrev: PropTypes.func.isRequired,
	onNext: PropTypes.func.isRequired
}

export default Nav