import { useMemo } from 'react'
import { bindActionCreators } from 'redux'

import d from '../commonFuncs/d'

const useNav = (departDate, dispatch, prevDepartDate, nextDepartDate) => {
	const navCbs = useMemo(() => {
		return bindActionCreators({
			onPrev: prevDepartDate,
			onNext: nextDepartDate
		}, dispatch)
	}, [prevDepartDate, nextDepartDate, dispatch])
	const isPrevDisabled = d.h0(departDate) <= d.h0()
	const isNextDisabled = d.h0(departDate) - 20 * 86400 * 1000 > d.h0()

	return {
		navCbs,
		isPrevDisabled,
		isNextDisabled
	}
}

export default useNav