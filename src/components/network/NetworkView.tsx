import { useEthers } from '@usedapp/core'
import { Box } from 'grommet'
import { FunctionComponent } from 'react'
import { ViewBox } from '../common/ViewBox'
import NetworkFiles from './NetworkFiles'

type Props = {}

export const NetworkStoreView: FunctionComponent<Props> = () => {
	const { account } = useEthers()

	if (!account) {
		return <Box>Not logged in</Box>
	}

	return (
		<ViewBox>
			<NetworkFiles account={account} />
		</ViewBox>
	)
}

export default NetworkStoreView
