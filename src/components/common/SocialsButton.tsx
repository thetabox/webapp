import { FunctionComponent } from 'react'
import { Anchor } from 'grommet'
import { Link, Twitter, Youtube } from 'grommet-icons'
import { dimColor } from '../../theme'

export type Props = {
	label?: string
	color?: string
}

export const TwitterThetaBox: FunctionComponent<Props> = ({ color = dimColor }) => {
	return (
		<Anchor
			color={color}
			href="https://twitter.com/thetabox_io"
			weight="normal"
			size="small"
			target="_blank"
			label="Follow ThetaNext"
			icon={<Twitter />}
		/>
	)
}

export const discordLink = 'https://discord.gg/nqQPf4jMK3'
export const ThetaboxDiscord: FunctionComponent<Props> = ({ label = 'Invite link to join the ThetaBox discord server', color = dimColor }) => {
	return <Anchor color={color} size="small" weight="normal" icon={<Link />} target="_blank" label={label} href={discordLink} />
}
