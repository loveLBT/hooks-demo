import React, { useState, useReducer, useEffect } from 'react'

const countReducer = (state, action) => {
	switch(action.type){
		case 'add': 
			return state + 1
		case 'minus':
			return state - 1
		default:
			return state
	}
}

const Effect = () => {
	const [ count, countDispatch ] = useReducer(countReducer, 0)
	const [ data, setData ] = useState({id: 1})
	const [ name, setName ] = useState('Jellal')

	const onEffect = () => {

	}
	// useEffect: 两个参数 第一个回调函数 第二个回调函数要监听的变量数组 变量改变 effect重新执行 默认监听全部
	useEffect(() => {
		const timer = setInterval(() => {
			countDispatch({type: 'add'})
		}, 1000)
		return () => clearInterval(timer)
	}, [count])
	
	useEffect(() => {
		console.log(data.id)
	}, [data.id])

	return (
		<div>
			<input 
				type='text' 
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<button
				onClick={() => countDispatch({type: 'add'})}
			>
				{count}
			</button>
			<button
				onClick={() => setData({id: 2})}
			>
				ID: {data.id}
			</button>
		</div>
	)
}

export default Effect