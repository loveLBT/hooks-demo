import React, { memo, useMemo, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import useWinSize from '../../hooks/useWinSize'
import './style.css'

const Slider = memo((props) => {
	const {
		min = 0 ,
		max = 100,
		value,
		onChange,
		onFilterText
	} = props

	const slider = useRef()
	const sliderWidth = useRef()

	const startHandle = useRef()
	const endHandle = useRef()

	const lastStartX = useRef()
	const lastEndX = useRef()

	const [start, setStart] = useState(value ? (value[0] / max) * 100 : 0)
	const [end, setEnd] = useState(value ? (value[1] / max) * 100 : 100)

	const startNum = useMemo(() => {
		if(value) {
			return (value[0] / max) * 100
		}

		return start
	}, [value, max, start])
	const endNum = useMemo(() => {
		if(value) {
			return (value[1] / max) * 100
		}

		return end
	}, [value, max, end])

	const startPercent = useMemo(() => {
		if(startNum > 100) {
			return 100
		}
		if(startNum < 0) {
			return 0
		}

		return startNum
	}, [startNum])
	const endPercent = useMemo(() => {
		if(endNum > 100) {
			return 100
		}
		if(endNum < 0) {
			return 0
		}

		return endNum
	}, [endNum])

	const startValue = useMemo(() => {
		return Math.round((startPercent * max) / 100)
	}, [startPercent])
	const endValue = useMemo(() => {
		return Math.round((endPercent * max) /100)
	}, [endPercent])
	const localStartValue = useMemo(() => {
		return Math.round((start * max) / 100)
	}, [start])
	const localEndValue = useMemo(() => {
		return Math.round((end * max) / 100)
	}, [end])

	const startText = useMemo(() => {
		if(onFilterText) {
			return onFilterText(startValue)
		}

		return startValue
	}, [startValue])
	const endText = useMemo(() => {
		if(onFilterText) {
			return onFilterText(endValue)
		}

		return endValue
	}, [endValue])

	const onStartTouchBegin = (e) => {
		const touch = e.touches[0]
		lastStartX.current = touch.pageX
	}
	const onStartTouchMove = (e) => {
		const touch = e.touches[0]
		const distance = touch.pageX - lastStartX.current
		lastStartX.current = touch.pageX

		setStart(start => start + (distance / sliderWidth.current) * 100)
	}
	const onStartTouchEnd = (e) => {
		if(value) {
			setStart((value[0] / max) * 100)
		}
	}
	const onEndTouchBegin = (e) => {
		const touch = e.touches[0]
		lastEndX.current = touch.pageX
	}
	const onEndTouchMove = (e) => {
		const touch = e.touches[0]
		const distance = touch.pageX - lastEndX.current
		lastEndX.current = touch.pageX

		setEnd(end => end + (distance / sliderWidth.current) * 100)
	}
	const onEndTouchEnd = (e) => {
		if(value) {
			setEnd((value[1] / max) * 100)
		}
	}

	useEffect(() => {
		startHandle.current.addEventListener('touchstart', onStartTouchBegin, false)
		startHandle.current.addEventListener('touchmove', onStartTouchMove, false)
		startHandle.current.addEventListener('touchend', onStartTouchEnd, false)

		endHandle.current.addEventListener('touchstart', onEndTouchBegin, false)
		endHandle.current.addEventListener('touchmove', onEndTouchMove, false)
		endHandle.current.addEventListener('touchend', onEndTouchEnd, false)

		return () => {
			startHandle.current.removeEventListener('touchstart', onStartTouchBegin, false)
			startHandle.current.removeEventListener('touchmove', onStartTouchMove, false)
			startHandle.current.removeEventListener('touchend', onStartTouchEnd, false)

			endHandle.current.removeEventListener('touchstart', onEndTouchBegin, false)
			endHandle.current.removeEventListener('touchmove', onEndTouchMove, false)
			endHandle.current.removeEventListener('touchend', onEndTouchEnd, false)
		}
	}, [])

	useEffect(() => {
		sliderWidth.current = parseFloat(
			window.getComputedStyle(slider.current).width
		)
	}, [useWinSize.width])

	useEffect(() => {
		console.log(localStartValue, localEndValue)
	}, [localStartValue, localEndValue])

	return (
		<div className='range-slider'>
			<div 
				ref={slider}
				className='slider'
			>
				<div 
					className='slider-range'
					style={{
						left: startPercent + '%',
						width: endPercent - startPercent + '%'
					}}
				>
				</div>
				<i
					ref={startHandle} 
					className='slider-handle'
					style={{
						left: startPercent + '%'
					}}
				>
					<span>{startText}</span>
				</i>
				<i 
					ref={endHandle}
					className='slider-handle'
					style={{
						left: endPercent + '%'
					}}
				>
					<span>{endText}</span>
				</i>
				
			</div>
		</div>
	)
})

Slider.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func,
	value: PropTypes.arrayOf(PropTypes.number),
	onFilterText: PropTypes.func
}

export default Slider