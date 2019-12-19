let idSeq = Date.now()

export const createSet = (payload) => {
	return {
		type: 'set',
		payload
	}
}
export const createAdd = (payload) => {
	return {
		type: 'add',
		payload
	}
	/*return (dispatch, getState) => {
		setTimeout(() => {
			const { todos } = getState()
			if(!todos.find(todo => todo.text === text)) {
				dispatch({
					type: 'add',
					payload: {
						id: idSeq++,
						text,
						complete: false
					}
				})
			}
		}, 3000)
		
	} */
}
export const createRemove = (payload) => {
	return {
		type: 'remove',
		payload
	}
}
export const createToggle = (payload) => {
	return {
		type: 'toggle',
		payload
	}
}

/*const addTodo = (payload) => dispatch(createAdd(payload))
const reomoveTodo = (payload) => dispatch(createRemove(payload))
const toggleTodo = (payload) => dispatch(createToggle(payload))
const setTodo = (payload) => dispatch(createSet(payload))

const actionCreators = {
	addTodo: createAdd,
	reomoveTodo: createRemove,
	toggleTodo: createToggle,
	setTodo: createSet
}*/

// 通过actionCreator与dispatch 直接生成改变数据的函数
export const bindActionCreators = (actionCreators, dispatch) => {
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