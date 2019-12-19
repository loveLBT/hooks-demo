import React, { useState, useMemo, useCallback, memo, useRef } from 'react'

// memo: 父子的渲染会使子级产生新值， memo 在子集没有元素的改变下 父级的渲染不会使子级产生新值
const Child = memo(({onClick, config}) => {
	console.log('child render')
	return (
		<button
			onClick={onClick}
			style={{color: config.color}}
		>
			{config.text}
		</button>
	)
})

// 函数每次跟新都会产生新值
// 使用useMemo: 不改变原来的值的情况下不产生新值
// 使用useCallback: 使用回调会导致回调内部产生新的值， 使用useCallback可以使回调不产生新值
const Parent = (props) => {
	const [ count, setCount ] = useState(() => props.count || 0)
	const [ name, setName ] = useState('Jellal')
	// useMemo
	const config = useMemo(() => ({
		color: count > 3 ? 'red' : 'blue',
		text: `按钮点击了${count}次`
	}), [count])
	// useCallback
	const handleChildClick = useCallback(() => {
		setCount((value) => value + 1)
	}, [])

	const countRef = useRef()
	countRef.current = count

	const handleAlertClick = () => {
		setTimeout(() => {
			alert(countRef.current)
		}, 2000)
	}
	return (
		<div>
			<input 
				value={name}
				onChange={(e) => {setName(e.target.value)}}
			/>
			<Child 
				onClick={handleChildClick}
				config={config}
			/>

			<button onClick={handleAlertClick}>alert click</button>
		</div>
	)
}

export default Parent