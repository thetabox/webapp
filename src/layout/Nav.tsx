import { FunctionComponent } from 'react'
import { Nav } from 'grommet'
import { NavigationItem } from './NavigationItem'
import { NavAnchor } from './NavAnchor'

export type Props = {
	navigationItems: NavigationItem[]
}

export const Navigation: FunctionComponent<Props> = ({ navigationItems }) => {
	return (
		<Nav pad="none" gap="none">
			{navigationItems.map((item, index) => {
				return <NavAnchor key={index} item={item} />
			})}
		</Nav>
	)
}
