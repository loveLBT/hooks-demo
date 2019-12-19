import React,{ memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './style.css'

const MenuItem = memo((props) => {
	const {
		value,
		label,
		onSelect,
		active
	} = props

	return (
		<li 
			className={classnames({active})}
			onClick={() => onSelect(value)}
		>
			{label}
		</li>
	)
})

MenuItem.propTypeps	= {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	label: PropTypes.string.isRequired,
	onSelect: PropTypes.string,
	active: PropTypes.string.isRequired
}

const Menu = memo((props) => {
	const {
		options,
		show,
		onSelect,
		onHideMenu
	} = props

	return (
		<div>
			{show && 
				<div 
					className="menu-mask"
					onClick={() => onHideMenu()}
				>
				</div>
			}
			
			<div className={classnames("menu", {show})}>
				<div className="menu-title"></div>
				<ul>
					{options && options.map(option => 
						<MenuItem 
							key={option.value}
							{...option}
							onSelect={onSelect}
						/>
					)}
				</ul>
			</div>
		</div>
	)
})

Menu.propTypes = {
	options: PropTypes.array,
	onSelect: PropTypes.func,
	show: PropTypes.bool.isRequired,
	onHideMenu: PropTypes.func.isRequired,
}

export default Menu