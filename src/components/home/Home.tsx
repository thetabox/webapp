import { Box, Diagram, Stack, Text } from 'grommet'
import { ReactComponent as Logo } from '../../content/logo.svg'
import { LogoComponent } from '../../layout/components/logo'
import { baseColor, formButtonsColor, light } from '../../theme'
import { ThetaNext } from '../common/ThetaNext'

export default function Home() {
	const thickness = 'xxsmall'
	const color = light
	const type = 'rectilinear'
	return (
		<Box>
			<Box width="medium" alignSelf="center">
				<Logo />

				<Stack guidingChild={1} margin={{ top: 'medium' }}>
					<Diagram
						animation={{ type: 'draw', duration: 5000 }}
						connections={[
							{
								fromTarget: 'upload',
								toTarget: 'gateway',
								thickness: thickness,
								color: color,
								type: type,
							},
							{
								fromTarget: 'gateway',
								toTarget: 'edgeStore',
								thickness: thickness,
								color: color,
								type: type,
							},
							{
								fromTarget: 'edgeStore',
								toTarget: 'schedule',
								thickness: thickness,
								color: color,
								type: type,
							},
							{
								fromTarget: 'edgeStore',
								toTarget: 'ifNeeded',
								thickness: thickness,
								color: color,
								type: type,
							},
							{
								fromTarget: 'ifNeeded',
								toTarget: 'makeReadyForTranscode',
								thickness: thickness,
								color: color,
								type: 'direct',
							},
							{
								fromTarget: 'schedule',
								toTarget: 'transcodeForNetwork',
								thickness: thickness,
								color: color,
								type: type,
							},
							{
								fromTarget: 'transcodeForNetwork',
								toTarget: 'playOnNetwork',
								thickness: thickness,
								color: color,
								type: type,
							},
						]}
					/>
					<Box>
						<Box direction="row-responsive">
							<Box
								fill="horizontal"
								id="upload"
								margin="small"
								pad="small"
								round="xxsmall"
								gap="small"
								elevation="small"
								background={baseColor}
								border={{ color: formButtonsColor, size: 'xsmall' }}
							>
								<Text alignSelf="center">Upload media</Text>
							</Box>
							<Box
								fill="horizontal"
								id="gateway"
								margin="small"
								pad="small"
								round="xxsmall"
								gap="small"
								elevation="small"
								background={baseColor}
								border={{ color: formButtonsColor, size: 'xsmall' }}
							>
								<Text alignSelf="center">Extract Info</Text>
							</Box>
						</Box>
						<Box
							id="edgeStore"
							margin="medium"
							pad="small"
							round="xxsmall"
							gap="small"
							elevation="small"
							background={baseColor}
							border={{ color: formButtonsColor, size: 'xsmall' }}
						>
							<Text alignSelf="center">Move media to Edge Store</Text>
						</Box>

						<Box direction="row-responsive">
							<Box
								fill="horizontal"
								id="schedule"
								margin="medium"
								pad="small"
								round="xxsmall"
								gap="small"
								elevation="small"
								background={baseColor}
								border={{ color: formButtonsColor, size: 'xsmall' }}
							>
								<Text alignSelf="center">Schedule play out</Text>
							</Box>
							<Box
								fill="horizontal"
								id="ifNeeded"
								margin="medium"
								pad="small"
								round="large"
								gap="small"
								elevation="small"
								background={formButtonsColor}
								// border={{ color: formButtonsColor, size: 'xsmall' }}
							>
								<Text color="#ffffff" alignSelf="center">
									Not mp4 file
								</Text>
							</Box>
						</Box>
						<Box
							alignSelf="end"
							id="makeReadyForTranscode"
							pad="small"
							round="xxsmall"
							gap="small"
							elevation="small"
							background={baseColor}
							border={{ color: formButtonsColor, size: 'xsmall' }}
						>
							<Text alignSelf="center">ThetaBox transcoding</Text>
						</Box>

						<Box direction="row-responsive">
							<Box
								fill="horizontal"
								id="transcodeForNetwork"
								margin="medium"
								pad="small"
								round="xxsmall"
								gap="small"
								elevation="small"
								background={baseColor}
								border={{ color: formButtonsColor, size: 'xsmall' }}
							>
								<Text alignSelf="center">Transcode</Text>
							</Box>
							<Box
								fill="horizontal"
								id="playOnNetwork"
								margin="medium"
								pad="small"
								round="xxsmall"
								gap="small"
								elevation="small"
								background={baseColor}
								border={{ color: formButtonsColor, size: 'xsmall' }}
							>
								<Text alignSelf="center">Play</Text>
							</Box>
						</Box>
					</Box>
				</Stack>
				<Box align="center">
				<Text size="xsmall">Powered by</Text>
					<ThetaNext />
				</Box>
			</Box>
		</Box>
	)
}
