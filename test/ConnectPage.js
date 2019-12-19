import React from 'react'
import { connect } from 'react-redux'

const Page = (props) => {
	console.log(props)
	return (
		<div 
			onClick={() => {
				props.add(2)
			}}
		>
			{props.count}
		</div>
	)
}

export default connect(function mapStateToProps(state) {
	return {
		count: state.counter.count,
		username: state.user.name
	}
}, function mapDispatchProps(dispatch) {
	return {
		add: (num) => dispatch({type: 'ADD', num})
	}
})(Page)