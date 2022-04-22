import { FunctionComponent, useEffect } from 'react'
import { Box } from 'grommet'
import { GapType, PadType } from 'grommet/utils'

export type Props = {
	title?: string
	pad?: PadType
	gap?: GapType
}

const padDefault = { right: 'small', left: 'xxsmall', bottom: 'medium', top: 'xxsmall' } as PadType
export const ViewBox: FunctionComponent<Props> = ({ title = 'ThetaBox', gap = 'small', pad = padDefault, ...otherProps }) => {
	useEffect(() => {
		document.title = title
	}, [])

	return <Box pad={pad} align="start" fill gap={gap} {...otherProps} />
}
