import { FunctionComponent } from 'react'
import { Box, Text } from 'grommet'
import { NavigationItem } from './NavigationItem'
import { Link } from 'react-router-dom'
import { Home } from 'grommet-icons'

export type Props = {
	item: NavigationItem
}

export const NavAnchor: FunctionComponent<Props> = ({ item }) => {
	return (
		<Link to={item.href} key={item.label} style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '16px' }}>
			<Box direction="row" pad={{ vertical: 'xxsmall', right: 'none', left: 'xsmall' }}>
				<Text color="#fff" wordBreak="break-word">
					{item.label.toUpperCase()}
				</Text>
			</Box>
		</Link>
	)
}

export const NavAnchorIcon: FunctionComponent<Props> = ({ item }) => {
	return (
		<Link to={item.href} key={item.label} style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '16px' }}>
			<Home color="#fff" style={{ opacity: 0.7 }} />
		</Link>
	)
}
