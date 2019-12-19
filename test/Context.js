import React, { useContext, useRef, useEffect } from  'react'

const MyContext = React.createContext({})
const WrapperContext = React.createContext()

const Header = () => {
	const { title } = useContext(MyContext)
	const titleRef = useRef()

	useEffect(() => {
		console.log(titleRef)
	}, [])

	return (
		<div>
			<h1 
				ref={titleRef}
			>
				{title}
			</h1>
		</div>
	)
}
const Wrapper = () => {
	return (
		<div>
			<MyContext.Consumer>
				{value1 => (
					<React.Fragment>
						<span>{value1.wrapper}</span>
						<WrapperContext.Consumer>
							{value2 => (
								<div>
									<span>{value2.left}</span>
									<span>{value2.right}</span>
								</div>
							)}
						</WrapperContext.Consumer>
					</React.Fragment>
				)}
			</MyContext.Consumer>
		</div>
	)
}

class Footer extends React.Component {
	static contextType = MyContext

	render() {
		const value = this.context
		console.log(this)
		return (
			<div>
				<span>aaa</span>
			</div>
		)
	}
}

const Context = () => {
	return (
		<MyContext.Provider 
			value={{
				title: 'header',
				wrapper: 'content',
				footer: 'foo'
			}}
		>
			<div>
				<Header />
				<WrapperContext.Provider 
					value={{
						left: 1,
						right: 2
					}}
				>
					<Wrapper />
				</WrapperContext.Provider>
				<Footer />
			</div>
		</MyContext.Provider>
	)
}

export default Context
