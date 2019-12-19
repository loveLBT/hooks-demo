import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './style.css'

const Filter = memo((props) => {
	const { 
		name, 
		checked,
		value,
		toggle 
	} = props

	return (
		<li 
			className={classnames('filter',{checked})}
			onClick={() => toggle(value)}
		>
			{name}
		</li>
	)
})

Filter.propTypes = {
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
}

const Filters = memo((props) => {
	const {
		filters,
		checkedMap,
		update
	} = props
	const toggle = useCallback((value) => {
		const newCheckedMap = {...checkedMap}
		if(value in checkedMap) {
			delete newCheckedMap[value]
		}else {
			newCheckedMap[value] = true
		}

		update(newCheckedMap)
	}, [checkedMap, update])

	return (
		<ul className='filters'>
			{filters.map(filter => 
				<Filter 
					key={filter.value}
					{...filter}
					checked={filter.value in checkedMap}
					toggle={toggle}
				/>
			)}
		</ul>
	)
})

Filters.propTypes = {
	filters: PropTypes.array.isRequired,
	checkedMap: PropTypes.object.isRequired,
	update: PropTypes.func.isRequired
}

export default Filters