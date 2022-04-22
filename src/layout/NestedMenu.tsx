import { FunctionComponent } from 'react'
import { Anchor, Accordion, AccordionPanel } from 'grommet'
import { Navigation } from './Nav'
import { SubMenu } from './interfaces/SubMenu'

export type Props = {
	subMenus: SubMenu[]
	handleRouteChange: Function
	activeIndex: number[]
}

export const NestedMenu: FunctionComponent<Props> = ({ subMenus, handleRouteChange, activeIndex }) => {
	const view = subMenus.map((x) => (
		<AccordionPanel
			key={x.label}
			label={
				<Anchor weight="normal" style={{ opacity: 0.7 }} margin="vertical" size="small">
					{x.label.toUpperCase()}
				</Anchor>
			}
		>
			<Navigation key={x.label} navigationItems={x.navigationItems} />
		</AccordionPanel>
	))

	return (
		<Accordion activeIndex={activeIndex} onActive={(newActiveIndex) => handleRouteChange(newActiveIndex)} multiple margin="none" width="185px">
			{view}
		</Accordion>
	)
}
