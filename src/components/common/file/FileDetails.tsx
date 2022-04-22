import { Box } from 'grommet'
import { FileEdgeStore } from '@thetabox/model'
import { dateTime } from '../ColumnHelpers'
import { FunctionComponent } from 'react'
import { Label } from '../label'

export type Props = {
	datum: FileEdgeStore
}

export const FileDetails: FunctionComponent<Props> = ({ datum }) => {
	return (
		<Box direction="row-responsive" gap="xsmall">
			<Box key={datum.id} pad={{ vertical: 'xsmall' }}>
				<Label text={'Creation date'} />
				{dateTime(datum.create_time)}
				<Label text={'Upload date'} />
				{dateTime(datum.upload_time)}
				<Label text={'Last updated'} />
				{dateTime(datum.update_time)}
			</Box>
		</Box>
	)
}
