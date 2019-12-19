import React, { useState, useEffect, useCallback, useRef, memo } from 'react'

import './style.css'

let idSeq = Date.now()
const STORAGE_KEY_TODO_LIST = 'STORAGE_KEY_TODO_LIST'

const Control = memo((props) => {
	const { addTodo } = props
	const inputRef = useRef()

	const onSubmit = (e) => {
		e.preventDefault()
		const text = inputRef.current.value.trim()
		if(!text) return 
		addTodo({
			id: idSeq++,
			text,
			complete: false
		})

		inputRef.current.value= ''
	}

	return (
		<div className='control'>
			<h1>todos</h1>
			<form onSubmit={onSubmit}>
				<input 
					ref={inputRef}
					type='text'
					className='new-todo'
					placeholder='what needs to be done?'
				/>
			</form>
		</div>
	)
})

const TodoItem = memo((props) => {
	const { 
		todo: {
			id,
			text,
			complete
		},
		toggleTodo,
		removeTodo
	} = props

	const onChange = () => {
		toggleTodo(id)
	}
	const onRemove = () => {
		removeTodo(id)
	}
	return (
		<li className='todo-item'>
			<input 
				type='checkbox' 
				onChange={onChange} 
				checked={complete} 
			/>
			<label className={complete ? 'complete' : ''}>{text}</label>
			<button onClick={onRemove}>&#xd7;</button>
		</li>
	)
})

const Todos = memo((props) => {
	const { todos, toggleTodo, removeTodo } = props

	return (
		<ul>
			{todos.map(todo => 
				<TodoItem 
					key={todo.id}
					todo={todo}
					toggleTodo={toggleTodo}
					removeTodo={removeTodo} 
				/>
			)}
		</ul>
	)
})

const TodoList = () => {
	const [todos, setTodos] = useState([])

	//传递给子组件的回调函数是否变化 []所要依赖的参数数组 数组中的任一项改变 回调函数会更新传递给子组件
	const addTodo = useCallback((todo) => {
		setTodos(todos => [...todos, todo])
	}, [])
	//传递给子组件的回调函数是否变化 []所要依赖的参数数组 数组中的任一项改变 回调函数会更新传递给子组件
	const removeTodo = useCallback((id) => {
		setTodos(todos => todos.filter(todo => todo.id !== id))
	}, [])
	//传递给子组件的回调函数是否变化 []所要依赖的参数数组 数组中的任一项改变 回调函数会更新传递给子组件
	const toggleTodo = useCallback((id) => {
		setTodos(todos => todos.map(todo => {
			if(todo.id === id) return { ...todo, complete: !todo.complete }
			else return todo
		}))
	}, [])
	//类似class组件的componentDidMoutn和componentShuoudUpdate []所要依赖的参数数组 数组中的任一项改变 改函数会重新执行
	useEffect(() => {
		const todos = sessionStorage.getItem(STORAGE_KEY_TODO_LIST) || '[]'
		setTodos(JSON.parse(todos))
	}, [])
	//类似class组件的componentDidMoutn和componentShuoudUpdate []所要依赖的参数数组 数组中的任一项改变 改函数会重新执行
	useEffect(() => {
		sessionStorage.setItem(STORAGE_KEY_TODO_LIST, JSON.stringify(todos))
	}, [todos])

	return (
		<div className='todo-list'>
			<Control addTodo={addTodo} />
			<Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
		</div>
	)
}

export default TodoList