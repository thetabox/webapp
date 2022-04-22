import { FileEdgeStore } from '@thetabox/model'
import ReactJson from 'react-json-view'
import { FunctionComponent } from 'react'
import { themeJsonView } from './ThemeJsonView'
import { Box } from 'grommet'

export type Props = {
	datum: FileEdgeStore | NetworkInformation
}

export const JsonView: FunctionComponent<Props> = ({ datum }) => {
	return (
		<Box margin="small">
			<ReactJson theme={themeJsonView} displayObjectSize={false} displayDataTypes={false} src={datum} collapseStringsAfterLength={40} />
		</Box>
	)
}
