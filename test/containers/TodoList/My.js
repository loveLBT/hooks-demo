import React, { useState, useRef, useEffect, useCallback } from 'react'

import './style.css'

let idSeq = Date.now()
const store = {
	todos: [],
	incrementCount: 0
}
const createSet = (payload) => {
	return {
		type: 'set',
		payload
	}
}
const createAdd = (payload) => {
	return (dispatch, getState) => {
		setTimeout(() => {
			const { todos } = getState()
			if(todos.find(todo => todo.text === payload)) { return }
			dispatch({
				type: 'add',
				payload: {
					id: idSeq++,
					text: payload,
					complete: false 
				}
			})
		}, 3000)
	}
}
const createRemove = (payload) => {
	return {
		type: 'remove',
		payload
	}
}
const createToggle = (payload) => {
	return {
		type: 'toggle',
		payload
	}
}
const STORAGE_KEY_TODO_LIST = 'STORAGE_KEY_TODO_LIST'

const Control = (props) => {
	const { addTodo } = props
	const inputRef = useRef()

	const onSubmit = (e) => {
		e.preventDefault()
		const text = inputRef.current.value.trim()
		if(!text) return 
		addTodo(text)
		inputRef.current.value = ''
	}
	return (
		<div className='control'>
			<h1>todos</h1>
			<form onSubmit={onSubmit}>
				<input 
					type="text" 
					ref={inputRef} 
					className='new-todo'
					placeholder='what needs to be done?'
				/>
			</form>
		</div>
	)
}

const TodoItem = (props) => {
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
				checked={complete} 
				onChange={onChange} 
			/>
			<label className={complete ? 'complete' : ''}>{text}</label>
			<button onClick={onRemove}>&#xd7;</button>
		</li>
	)
}

const Todos = (props) => {
	const { todos, ...rest } = props

	return (
		<ul className='todos'>
			{todos.map(todo => 
				<TodoItem 
					key={todo.id} 
					todo={todo} 
					{...rest}
				/>
			)}
		</ul>
	)
}

const TodoList = () => {
	const [todos, setTodos] = useState([])
	const [incrementCount, setIncrementCount] = useState(0)

	const bindActionCreators = (actionCreators, dispatch) => {
		let ret = {}

	for(let key in actionCreators) {
		ret[key] = (...args) => {
			const actionCreator = actionCreators[key]
			const action = actionCreator(...args)
		
			dispatch(action)
		}
	}
	return ret
	}
	const combineReducers = (reducers) => {
		return (state, action) => {
			let changed = {}
			for(let key in reducers) {
				changed[key] = reducers[key](state[key], action)
			}
			return {
				...state,
				...changed
			}
		}
	}
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
		const newState = reducer(store, action)
		const setters = {
			todos: setTodos,
			incrementCount: setIncrementCount
		}
		if(typeof action === 'function') {
			action(dispatch, () => store)
			return 
		}
		for(let key in newState) {
			setters[key](newState[key])
		}
	}, [todos, incrementCount])

	useEffect(() => {
		const todos = sessionStorage.getItem(STORAGE_KEY_TODO_LIST) || '[]'
		dispatch(createSet(todos))
		setTodos(JSON.parse(todos))
	}, [])
	useEffect(() => {
		sessionStorage.setItem(STORAGE_KEY_TODO_LIST, JSON.stringify(todos))
	}, [todos])
	useEffect(() => {
		Object.assign(store, {todos, incrementCount})
		console.log(store)
	}, [todos, incrementCount])

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
					...bindActionCreators({removeTodo: createRemove, toggleTodo: createToggle}, dispatch)
				}
			/>
		</div>
	)
}

export default TodoList