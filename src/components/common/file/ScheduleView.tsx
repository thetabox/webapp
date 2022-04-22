import { Box, Button, DateInput, Text, Tip } from 'grommet'
import { SchedulePlay } from 'grommet-icons'
import { FunctionComponent, SetStateAction, useState } from 'react'
import { ScheduleOnAir } from '../../network/JobActions'

export type Props = {
	checked: string[]
	setChecked: { (value: SetStateAction<string[]>): void; (arg0: never[]): void }
}

const textSetPlayOut = 'Schedule play out date'
export const ScheduleView: FunctionComponent<Props> = ({ checked, setChecked }) => {
	const [onAirDate, setOnAirDate] = useState(new Date().toISOString())

	const onChangeOnAirDate = (event: { value: any }) => {
		const nextValue = event.value
		setOnAirDate(nextValue)
	}

	return (
		<Box direction="row-responsive">
			<Box direction="row" align="center" justify="center">
				<Tip content="Play out date">
					<Text weight="bold">{onAirDate && new Date(onAirDate).toLocaleDateString()}</Text>
				</Tip>
				<DateInput value={onAirDate} onChange={onChangeOnAirDate} />
			</Box>
			<Button
				tip={textSetPlayOut}
				margin="small"
				onClick={() => {
					ScheduleOnAir(checked, new Date(onAirDate))
					setChecked([])
				}}
				label={textSetPlayOut}
				icon={<SchedulePlay />}
			/>
		</Box>
	)
}
