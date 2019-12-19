import React, { 
	memo,
	useMemo,
	useContext, 
	useState, 
	useEffect,
	useCallback 
} from 'react'
import PropTypes from 'prop-types'
import URI from 'urijs'

import { CandidateContext } from '../context'
import './style.css'

const Channel = memo((props) => {
	const {
		type,
		name,
		desc
	} = props
	const {
		trainNumber,
		dStation,
		aStation,
		date
	} = useContext(CandidateContext)

	const src = useMemo(() => {
		return new URI('order.html')
						.setSearch('trainNumber', trainNumber)
						.setSearch('dStation', dStation)
						.setSearch('aStation', aStation)
						.setSearch('type', type)
						.setSearch('date', date)
						.toString()
	}, [trainNumber, dStation, aStation, date])

	return (
		<div className='channel'>
			<div className="middle">
				<p className='name'>{name}</p>
				<p className='desc'>{desc}</p>
			</div>
			<a href={src} className="buy-wrapper">
				<span className="buy">买票</span>
			</a>
		</div>
	)
})

Channel.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	desc: PropTypes.string.isRequired
}

const Seat = memo((props) => {
	const {
		type,
		ticketsLeft,
		priceMsg,
		channels,
		expanded,
		onToggle,
		index
	} = props

	return (
		<li>
			<div className="bar">
				<span className='seat'>{type}</span>
				<span className='price'>
					<i>￥</i>
					{priceMsg}
				</span>
				<span 
					className='btn'
					onClick={() => onToggle(index)}
				>
					{expanded ? '预定' : '收起'}
				</span>
				<span className='num'>{ticketsLeft}</span>
			</div>
			<div 
				className="channels"
				style={{
					height: expanded ? channels.length * 55 : 0 + 'px'
				}}
			>
				{channels.map(channel => 
					<Channel 
						key={channel.name}
						type={type}
						{...channel}
					/>
				)}
			</div>
		</li>
	)
})

Seat.propTypes = {
	type: PropTypes.string.isRequired,
	ticketsLeft: PropTypes.string.isRequired,
	priceMsg: PropTypes.string.isRequired,
	channels: PropTypes.array.isRequired,
	expanded: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
}

const Candidate = memo((props) => {
	const {
		tickets
	} = props
	const [expandedIndex, setExpandedIndex] = useState(-1)
	const onToggle = useCallback((index) => {
		setExpandedIndex(index === expandedIndex ? -1 : index)
	}, [expandedIndex])

	return (
		<div className='candidate'>
			<ul>
				{tickets.map((ticket, index) => 
					<Seat 
						key={ticket.type}
						index={index}
						expanded={index === expandedIndex}
						onToggle={onToggle}
						{...ticket}
					/>
				)}
			</ul>
		</div>
	)
})

Candidate.propTypes = {
	tickets: PropTypes.array.isRequired
}

export default Candidate