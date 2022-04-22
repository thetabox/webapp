import { FunctionComponent } from 'react'
import { Heading } from 'grommet'

export type Props = {
	text: string
	align?: 'start' | 'end'
}

export const ViewLabel: FunctionComponent<Props> = ({ text, align = 'start' }) => {
	return (
		<Heading level={1} alignSelf={align} margin={{ bottom: 'xsmall', top: 'none' }}>
			{text.toUpperCase()}
		</Heading>
	)
}

export const CardLabel: FunctionComponent<Props> = ({ text, align = 'start' }) => {
	return (
		<Heading level={2} alignSelf={align} margin={{ bottom: 'xsmall' }}>
			{text.toUpperCase()}
		</Heading>
	)
}
