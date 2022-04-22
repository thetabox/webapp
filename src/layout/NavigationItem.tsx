export interface NavigationItem {
	label: string
	href: string
}

export interface NavigationItemAction extends NavigationItem {
	action: Function
}
