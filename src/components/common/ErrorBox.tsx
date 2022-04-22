import { FunctionComponent } from 'react'
import { Text } from 'grommet'
import { CardBox } from './CardBox'
import { ViewLabel } from './CardLabel'
import { ViewBox } from './ViewBox'
import { formButtonsColor } from '../../theme'

export type Props = {
	label: string
	value: string | number
	background?: string
}

export const ErrorBox: FunctionComponent<Props> = ({ label, value, background = formButtonsColor }) => {
	return (
		<ViewBox>
			<CardBox>
				<ViewLabel align="start" text={label} />
				<Text size="medium">{value}</Text>
			</CardBox>
		</ViewBox>
	)
}
