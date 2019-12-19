import React, { memo } from 'react'
import PropTypes from 'prop-types'

import AlphaIndex from './AlphaIndex' 

const alphabet = Array.from(new Array(26), (a, index) => String.fromCharCode(65 + index))

const CityItem = memo((props) => {
	const { name, onSelect } = props

	return (
		<li className='city-li' onClick={() => onSelect(name)}>
			{name}
		</li>
	)
})

CityItem.propTypes = {
	name: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

const CitySection = memo((props) => {
	const { title, cities = [], onSelect } = props

	return (
		<ul className='city-ul'>
			<li key={title} className='city-li' data-cate={title}>{title}</li>
			{cities.map(city => 
				<CityItem 
					key={city.name}
					name={city.name}
					onSelect={onSelect}
				/>
			)}
		</ul>
	)  
})

CitySection.propTypes = {
	title: PropTypes.string.isRequired,
	cities: PropTypes.arrayOf(PropTypes.object),
	onSelect: PropTypes.func.isRequired
}

const CityList = memo((props) => {
	const { sections, onSelect, toAlpha } = props

	return (
		<div className='city-list'>
			<div className='city-cate'>
				{sections.map(section => 
					<CitySection 
						key={section.title}
						title={section.title}
						cities={section.citys}
						onSelect={onSelect}
					/>
				)}
			</div>
			<div className='city-index'>
				{alphabet.map(alpha => 
					<AlphaIndex 
						key={alpha}
						alpha={alpha}
						onClick={toAlpha}
					/>
				)}
			</div>
		</div>
	)
})

CityList.propTypes = {
	sections: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSelect: PropTypes.func.isRequired,
	toAlpha: PropTypes.func.isRequired
}

export default CityList