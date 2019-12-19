import React, { useState, useEffect, useCallback, useRef, memo } from 'react'

import {
	createSet,
	createAdd,
	createRemove,
	createToggle,
	bindActionCreators
} from './actions'
import combineReducers from './combineReducers'
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
		removeTodo, 
		toggleTodo
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
	const { todos, ...rest } = props
	return (
		<ul>
			{todos.map(todo => 
				<TodoItem 
					key={todo.id}
					todo={todo}
					{...rest}
				/>
			)}
		</ul>
	)
})

const TodoList = () => {
	const [todos, setTodos] = useState([])
	const [incrementCount, setIncrementCount] = useState(0)

	const todosReducer = (state, action) => {
		const { type, payload } = action

		switch(type) {
			case 'set':
				return payload
			case 'add':
				return [...state, payload]
			case 'remove':
				return state.filter(todo => todo.id !== payload)
			case 'toggle':
				return state.map(todo => {
									if(todo.id === payload) return { ...todo, complete: !todo.complete }
									else return todo
								})
			default:
				return state
		}
	}
	const incrementCountReducer = (state, action) => {
		const { type } = action

		switch(type) {
			case 'set':
			case 'add': 
				return state + 1
			default:
				return state
		}
	}
	const reducers = {
		todos: todosReducer,
		incrementCount: incrementCountReducer
	}
	const reducer = combineReducers(reducers)
	
	const dispatch = useCallback((action) => {
		const state = {
			todos,
			incrementCount
		}

		const newState = reducer(state, action)

		const setters = {
			todos: setTodos,
			incrementCount: setIncrementCount
		}

		for(let key in newState) {
			setters[key](newState[key])
		}

	}, [todos, incrementCount])

	useEffect(() => {
		const todos = sessionStorage.getItem(STORAGE_KEY_TODO_LIST) || '[]'
		dispatch(createSet(JSON.parse(todos)))
	}, [])

	useEffect(() => {
		sessionStorage.setItem(STORAGE_KEY_TODO_LIST, JSON.stringify(todos))
	}, [todos])

	return (
		<div className='todo-list'>
			<Control  
				{
					...bindActionCreators({addTodo: createAdd}, dispatch)
				}
			/>
			<Todos 
				todos={todos} 
				{
					...bindActionCreators(
						{removeTodo: createRemove, toggleTodo: createToggle}, 
						dispatch
					)
				} 
			/>
		</div>
	)
}

export default TodoList