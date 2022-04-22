import { Box, Text, Image } from 'grommet'
import { FileEdgeStore } from '@thetabox/model'
import numbro from 'numbro'
import { bytes } from '../ColumnHelpers'
import { FunctionComponent } from 'react'

export type Props = {
	datum: FileEdgeStore
}

export const MediaInfoDetails: FunctionComponent<Props> = ({ datum }) => {
	if (!datum.mediaInfo) return <></>

	const { channel_layout, duration, height, width, channels, thumbnail } = datum.mediaInfo
	let time = numbro(duration).formatTime()
	if (time.split(':')[0].length === 1) {
		time = `0${time}`
	}

	return (
		<Box direction="row-responsive" gap="small">
			<Box key={datum.id} pad={{ vertical: 'xsmall' }}>
				<Text>{time} </Text>
				<Text>
					{channels} CH {channel_layout.toUpperCase()}
				</Text>
				<Text>
					W{width} x H{height}
				</Text>
				{bytes(datum.size)}
			</Box>
			<Box height="xsmall" width="xsmall">
				<Image fit="contain" src={`data:image/png;base64, ${thumbnail}`} />
			</Box>
		</Box>
	)
}
