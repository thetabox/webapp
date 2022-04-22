import { useEthers } from '@usedapp/core'
import { Box } from 'grommet'
import { FunctionComponent } from 'react'
import { ViewBox } from '../common/ViewBox'
import Upload from './Upload'
import UploadFiles from './UploadFiles'

type Props = {}

export const UploadView: FunctionComponent<Props> = () => {
	const { account } = useEthers()

	if (!account) {
		return <Box>Not logged in</Box>
	}

	return (
		<ViewBox>
			<Upload />
			<UploadFiles account={account} />
		</ViewBox>
	)
}

export default UploadView
