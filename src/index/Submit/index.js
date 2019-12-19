import React, { memo } from 'react'

import './style.css'

const Submit = memo((props) => {
	return (
		<div className='submit'>
			<button type='submit' className='submit-button'>搜索</button>
		</div>
	)
})

export default Submit