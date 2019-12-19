import React, { useState, useEffect, useCallback } from 'react'

const useCountComponent = (count) => {
	const size = useSize()
	return <h1>{count}width:{size.width}height: {size.height}}</h1>
} 
const useCount = (defaultCount) => {
	const [count, setCount] = useState(defaultCount)

	return [count, setCount]
}
const useSize = () => {
	const [size, setSize] = useState({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight
	})

	const onResize = useCallback(() => {
		setSize({
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		})
	}, [])

	useEffect(() => {
		window.addEventListener('resize', onResize, false)

		return () => {
			window.removeEventListener('resize', onResize, false)
		}
	}, [])

	return size

}

const CustomHookPage = () => {
	const [count, setCount] = useCount(0)
	const Counter = useCountComponent(count)
	const size = useSize()

	return (
		<div>
			<h1>{count}</h1>
			<button
				onClick={() => {
					setCount(val => val + 1)
				}}
			>
				add
			</button>
			{Counter}

			<p>
				width: {size.width} height: {size.height}
			</p>
		</div>
	)
}

export default CustomHookPage