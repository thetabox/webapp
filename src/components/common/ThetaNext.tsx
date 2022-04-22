import { Box, Text } from 'grommet'
import { Link } from 'react-router-dom'

export const size = 'large'
export const logoStyle = {
	opacity: '.5',
}

export const ThetaNext = () => {
	return (
		<Link to="/" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
			<Box pad="xsmall" margin={{ top: '5px' }}>
				<Text size="large">
					Theta
					<Text size={size} style={logoStyle}>
						[
					</Text>
					<Text size={size}>N</Text>
					<Text size={size} style={logoStyle}>
						]
					</Text>
					<Text size={size}></Text>ext
				</Text>
			</Box>
		</Link>
	)
}
