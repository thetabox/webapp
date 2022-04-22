import { FunctionComponent } from 'react'
import { Box } from 'grommet'
import { baseColor, formButtonsColor } from '../../theme'

export type Props = {
	background?: string
}

export const CardBox: FunctionComponent<Props> = ({ background = baseColor, ...otherProps }) => {
	return (
		<Box
			pad="small"
			align="start"
			round="xxsmall"
			gap="small"
			elevation="small"
			background={background}
			border={{ color: formButtonsColor, size: 'xsmall' }}
			{...otherProps}
		/>
	)
}
