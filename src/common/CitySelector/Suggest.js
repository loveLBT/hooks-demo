import React, { useMemo, useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'

const SuggestItem = memo((props) => {
	const { name, onClick } = props

	return (
		<li className='city-suggest-li' onClick={() => onClick(name)}>
			{name}
		</li>
	)
})
SuggestItem.propTypes = {
	name: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

const Suggest = memo((props) => {
	const { searchKey, onSelect } = props
	const [result, setResult] = useState([])

	useEffect(() => {
		fetch('/rest/search?key=' + encodeURIComponent(searchKey))
			.then(res => res.json())
			.then(data => {
				const { result, searchKey: sKey } = data
				if(sKey === searchKey) {
					setResult(result)
				}
			})
	}, [searchKey])
	const fallBackResult = useMemo(() => {
		if(!result.length) {
			return [{display: searchKey}]
		}
		return result
	}, [result, searchKey])


	return (
		<div className='city-suggest'>
			<ul className='city-suggest-ul'>
				{fallBackResult.map(item => 
					<SuggestItem 
						key={item.display}
						name={item.display}
						onClick={onSelect}
					/>
				)}
			</ul>
		</div>
		
	)
})

Suggest.propTypes = {
	searchKey: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

export default Suggest