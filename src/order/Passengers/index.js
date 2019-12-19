import React,{ memo, useMemo } from 'react'
import PropTypes from 'prop-types'

import './style.css'

const Passenger = memo((props) => {
	const {
		id,
		name,
		ticketType,
		licenceNo,
		gender,
		birthday,
		followAdultName,
		onRemove,
		onUpdate,
		onShowGenderMenu,
		onShowFollowAdultMenu,
		onShowTicketTypeMenu
	} = props
	const isAdult = useMemo(() => {
		return ticketType === "adult"	
	}, [ticketType])

	return (
		<li className="passenger">
			<i className="delete" onClick={() => onRemove(id)}>
				-
			</i>

			<ol className='items'>
				<li className="item">
					<label className="label name">姓名</label>
					<input 
						type="text"
						className='input name'
						placeholder="乘客姓名"
						value={name}
						onChange={(e) => onUpdate(id, {name: e.target.value})}
					/>
					<label 
						className="ticket-type"
						onClick={() => onShowTicketTypeMenu(id)}
					>
						{isAdult ? "成人票" : "儿童票"}
					</label>
				</li>
				{isAdult && 
					<li className="item">
						<label className="label licenceNo">身份证</label>
						<input 
							type="text" 
							className="input licenceNo"
							placeholder="证件号码"
							value={licenceNo}
							onChange={(e) => onUpdate(id, {licenceNo: e.target.value})}
						/>
					</li>
				}
				{!isAdult && 
					<li 
						className="item arrow" 
						onClick={() => onShowGenderMenu(id)}
					>
						<label className="label gender">性别</label>
						<input 
							type="text"
							className="input gender"
							placeholder="请选择"
							value={
								gender === "male" ?
									"男" : gender === "female" ? 
									"女" : ""
							}
							readOnly
						/>
					</li>
				}
				{!isAdult &&
					<li className="item">
						<label className="label birthday">出生日期</label>
						<input 
							type="text" 
							className="input birthday"
							placeholder="如 19951213"
							value={birthday}
							onChange={(e) => onUpdate(id, {birthday: e.target.value})}
						/>
					</li>
				}
				{!isAdult &&
					<li className="item arrow">
						<label className="label followAdult">同行成人</label>
						<input 
							type="text" 
							className="input followAdult"
							placeholder="请选择"
							value={followAdultName}
							readOnly
							onClick={() => onShowFollowAdultMenu(id)}
						/>
					</li>
				}
			</ol>
		</li>
	)
})

Passenger.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	ticketType: PropTypes.string.isRequired,
	followAdult: PropTypes.number,
	licenceNo: PropTypes.string,
	gender: PropTypes.string,
	birthday: PropTypes.string,
	followAdultName: PropTypes.string,
	onRemove: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired,
	onShowGenderMenu: PropTypes.func.isRequired,
	onShowFollowAdultMenu: PropTypes.func.isRequired,
	onShowTicketTypeMenu: PropTypes.func.isRequired
}

const Passengers = memo((props) => {
	const {
		passengers,
		onCreateAdult,
		onCreateChild,
		onRemovePassenger,
		onUpdatePassenger,
		onShowGenderMenu,
		onShowFollowAdultMenu,
		onShowTicketTypeMenu
	} = props

	const nameMap = useMemo(() => {
		let ret = {}
		for(let passenger of passengers) {
			ret[passenger.id] = passenger.name
		}

		return ret
	}, [passengers])

	return (
		<div className="passengers">
			<ul>
				{passengers.map(passenger => 
					<Passenger 
						key={passenger.id}
						followAdultName={nameMap[passenger.followAdult]}
						onRemove={onRemovePassenger}
						onUpdate={onUpdatePassenger}
						onShowTicketTypeMenu={onShowTicketTypeMenu}
						onShowFollowAdultMenu={onShowFollowAdultMenu}
						onShowGenderMenu={onShowGenderMenu}
						{...passenger}
					/>
				)}
			</ul>

			<section className="add">
				<div 
					className="adult"
					onClick={() => {
						onCreateAdult()
					}}
				>
					添加成人
				</div>
				<div 
					className="child"
					onClick={() => {
						onCreateChild()
					}}
				>
					添加儿童
				</div>
			</section>
		</div>
	)
})

Passengers.propTypes = {
	passengers: PropTypes.array.isRequired,
	onCreateAdult: PropTypes.func.isRequired,
	onCreateChild: PropTypes.func.isRequired,
	onRemovePassenger: PropTypes.func.isRequired,
	onUpdatePassenger: PropTypes.func.isRequired,
	onShowGenderMenu: PropTypes.func.isRequired,
	onShowFollowAdultMenu: PropTypes.func.isRequired,
	onShowTicketTypeMenu: PropTypes.func.isRequired
}

export default Passengers