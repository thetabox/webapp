import { FunctionComponent } from 'react'
import { Text, Box } from 'grommet'

interface Props {
	text: string | number
	color?: string
}

export const Label: FunctionComponent<Props> = ({ text, ...otherProps }) => {
	return (
		<Text size="xsmall" margin={{ start: 'none', bottom: 'none', top: 'small' }} {...otherProps}>
			{text}
		</Text>
	)
}

export const LabelWithBox: FunctionComponent<Props> = ({ text, color, ...otherProps }) => {
	return (
		<Box background={color} round="xxsmall" pad="xxsmall">
			<Text size="xsmall" margin={{ start: 'none', bottom: 'none', top: 'none' }} {...otherProps}>
				{text}
			</Text>
		</Box>
	)
}

export const LabelValue: FunctionComponent<Props> = ({ text, ...otherProps }) => {
	return (
		<Text size="large" weight="bold" style={{ opacity: 0.9 }} {...otherProps}>
			{text}
		</Text>
	)
}

export const LabelNoSpace: FunctionComponent<Props> = ({ text, ...otherProps }) => {
	return (
		<Text size="xsmall" margin={{ start: 'none', bottom: 'none', top: 'none' }} {...otherProps}>
			{text}
		</Text>
	)
}

export const HelpLabel: FunctionComponent<Props> = ({ text }) => {
	return (
		<Text size="xsmall" margin={{ start: 'none', bottom: 'none' }}>
			{text}
		</Text>
	)
}

export const ErrorLabel: FunctionComponent<Props> = ({ text }) => {
	return (
		<Text size="xsmall" color="status-error" margin={{ start: 'none', bottom: 'none' }}>
			{text}
		</Text>
	)
}

interface FormLabelProps {
	text: string
	icon: any
	color?: string
}

export const FormLabel: FunctionComponent<FormLabelProps> = ({ text, icon, color = '' }) => {
	return (
		<Box direction="row-responsive" align="center" margin="none">
			{icon}
			<Text margin={{ left: 'small', bottom: 'small' }} textAlign="start" size="small" color={color}>
				{text}
			</Text>
		</Box>
	)
}
