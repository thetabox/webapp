import { FunctionComponent } from 'react'
import { FileEdgeStore, FileNetwork } from '@thetabox/model'
import { Box, Button, Text } from 'grommet'
import { CardBox } from './CardBox'
import ReactPlayer from 'react-player'
import { Close } from 'grommet-icons'
import PlayerForm from './PlayerForm'

type Props = {
	file: FileEdgeStore | FileNetwork
	setShow: Function
}

export const Player: FunctionComponent<Props> = ({ file, setShow }) => {
	let player = (
		<ReactPlayer
			url={`http://${process.env.REACT_APP_IP_GATEWAY}:${process.env.REACT_APP_PORT_GATEWAY}/proxy/api/v1/file?key=${file.edgeStore.key}&relpath=${file.edgeStore.relpath}`}
			controls
		/>
	)
	let playFrom = 'Streamed from Edge Store'

	const fileNetwork = file as FileNetwork
	if (fileNetwork.video && fileNetwork.video?.playback_uri && !fileNetwork.network?.presigned_url_expired) {
		const playerSrc = `https://player.thetavideoapi.com/video/${fileNetwork?.video?.id}`
		playFrom = 'Streamed from Theta Network'
		player = <iframe src={playerSrc} width="100%" height="100%" style={{ border: 'none' }} />
	}

	return (
		<CardBox>
			<Box direction="row" pad="none" margin="none">
				<Button alignSelf="start" tip="Close player" plain onClick={() => setShow(false)} icon={<Close />} />
				<Text margin={{ left: 'small', top: 'xxsmall' }}>{playFrom.toUpperCase()}</Text>
			</Box>
			<Box height={`${file.mediaInfo.height / 3}px`} width={`${file.mediaInfo.width / 3}px`} pad="none" margin="none">
				{player}
			</Box>
			<PlayerForm fileEdgeStore={file} />
		</CardBox>
	)
}

export default Player
