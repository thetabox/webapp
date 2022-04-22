import { useEthers } from '@usedapp/core'
import { Box } from 'grommet'
import { FunctionComponent } from 'react'
import { ViewBox } from '../common/ViewBox'
import EdgeStoreFiles from './EdgeStoreFiles'

type Props = {}

export const EdgeStoreView: FunctionComponent<Props> = () => {
	const { account } = useEthers()

	if (!account) {
		return <Box>Not logged in</Box>
	}

	return (
		<ViewBox>
			<EdgeStoreFiles account={account} />
		</ViewBox>
	)
}

export default EdgeStoreView
