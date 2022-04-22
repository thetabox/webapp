import { FunctionComponent } from 'react'
import { Paragraph } from 'grommet'
import { CardBox } from '../common/CardBox'
import { ViewLabel } from '../common/CardLabel'
import { ThetaboxDiscord } from '../common/SocialsButton'
import { ViewBox } from '../common/ViewBox'

export const SupportView: FunctionComponent = () => {
	return (
		<ViewBox title="Discord">
			<CardBox >
				<ViewLabel text="Support" align="start" />
				<Paragraph fill size="small" margin={{ vertical: 'xsmall' }}>
					If you need help you can contact us on our ThetaBox Discord server.
				</Paragraph>
				<ThetaboxDiscord />
			</CardBox>
		</ViewBox>
	)
}
