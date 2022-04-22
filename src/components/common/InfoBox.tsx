import { FunctionComponent } from 'react'
import { Box } from 'grommet'
import { Info } from './interfaces/Info'
import { LabelValue, LabelWithBox } from './label'

export type Props = {
	data: Info
}

export const InfoBox: FunctionComponent<Props> = ({ data }) => {
	return (
		<Box align="center" key={data.label}>
			<LabelWithBox text={data.label} color={data.color} />
			<Box direction="row" align="center" pad={{ bottom: 'xxsmall' }}>
				<LabelValue text={data.value} />
			</Box>
		</Box>
	)
}
