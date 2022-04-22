import React, { FunctionComponent, useContext } from 'react'
import { Route, useLocation, Routes } from 'react-router-dom'
import { ResponsiveContext } from 'grommet'
import EdgeStoreView from '../../components/edgestore/EdgeStoreView'
import NetworkView from '../../components/network/NetworkView'
import UploadView from '../../components/upload/UploadView'
import { edgeStoreRoute, networkRoute, supportRoute } from './SiteMap'
import { SupportView } from '../../components/help/Support'

export type Props = {
	handleClose: Function
}

export const Routing: FunctionComponent<Props> = ({ handleClose }) => {
	let location = useLocation()
	const size = useContext(ResponsiveContext)

	React.useEffect(() => {
		if (size === 'small') handleClose()
	}, [location])

	return (
		<Routes>
			<Route path="/" element={<UploadView />} />
			<Route path={edgeStoreRoute} element={<EdgeStoreView />} />
			<Route path={networkRoute} element={<NetworkView />} />
			<Route path={supportRoute} element={<SupportView />} />
		</Routes>
	)
}
