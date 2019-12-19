import React, { Component, lazy, Suspense } from 'react'

const Page = lazy(() => import(/*webpackChunkName:"page"*/'./Page'))

export default class LazyPage extends Component {
	render() {
		return (
			<div>
				<Suspense fallback={<div>loading...</div>}>
					<Page></Page>
				</Suspense>
			</div>
		)
	}
}