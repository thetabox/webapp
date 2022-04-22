export const edgeStoreRoute = '/box/edgestore'
export const networkRoute = '/box/thetanetwork'
export const supportRoute = '/help/support'

export const BoxesMenu = () => {
	let items = {
		label: 'boxes',
		navigationItems: [
			{ label: 'edge store', href: edgeStoreRoute },
			{ label: 'theta network', href: networkRoute },
		],
	}

	return items
}

export const SupportMenu = () => {
	let items = {
		label: 'help',
		navigationItems: [{ label: 'support', href: supportRoute }],
	}

	return items
}
