import React, { useState } from 'react'
import { Box, Button, Collapsible, Text } from 'grommet'
import { Menu, Close } from 'grommet-icons'
import { BrowserRouter } from 'react-router-dom'
import { BoxesMenu, SupportMenu } from './siteMap/SiteMap'
import { NestedMenu } from './NestedMenu'
import { isMobile } from 'react-device-detect'
import { NavAnchor } from './NavAnchor'
import { LogoComponent } from './components/logo'
import { Routing } from './siteMap/Routing'
import Home from '../components/home/Home'
import { useEthers } from '@usedapp/core'

function Layout() {
	const [openNav, setOpenNav] = React.useState(!isMobile)
	const [activeIndex, setActiveIndex] = useState([0])
	const { activateBrowserWallet, account, deactivate } = useEthers()

	let menuIcon = <Menu size="medium" color="#fff" style={{ opacity: 0.7 }} />
	if (openNav) menuIcon = <Close size="medium" color="#fff" style={{ opacity: 0.7 }} />

	const closeMenu = () => {
		setOpenNav(false)
	}

	let navigation = (
		<Collapsible direction="horizontal" open={openNav}>
			<Box flex pad={{ right: 'none', left: 'small' }} align="start" margin="none" gap="none">
				<NavAnchor key="upload" item={{ href: '/', label: 'UPLOAD' }} />
				<NestedMenu activeIndex={activeIndex} handleRouteChange={setActiveIndex} subMenus={[BoxesMenu()]} />
				<NestedMenu activeIndex={activeIndex} handleRouteChange={setActiveIndex} subMenus={[SupportMenu()]} />
			</Box>
		</Collapsible>
	)

	if (!account) {
		navigation = <></>
	}

	const visibility = account ? 'visible' : 'hidden'
	return (
		<Box>
			<BrowserRouter>
				<Box
					as="header"
					direction="row"
					pad={{ vertical: 'none', horizontal: 'xxsmall' }}
					margin="none"
					justify="between"
					fill="horizontal"
					style={{ zIndex: 1000 }}
				>
					<Button size="small" style={{ visibility: visibility }} onClick={() => setOpenNav(!openNav)} icon={menuIcon} />
					<Box gap="none" direction="row">
						{account ? (
							<>
								<Text truncate alignSelf="center">
									{account}
								</Text>
								<Button alignSelf="center" margin="small" onClick={deactivate} label="Logout" />
								{LogoComponent}
							</>
						) : (
							<Button alignSelf="center" margin="small" onClick={activateBrowserWallet} label="Login with MetaMask" />
						)}
					</Box>
				</Box>
				<Box flex justify="center" direction="row-reverse" margin="none" pad="none">
					<Box margin="none" pad="none" fill style={{ maxWidth: '2000px' }}>
						{/* switch between login page and the rest */}
						{account ? <Routing handleClose={closeMenu} /> : <Home />}
					</Box>
					{navigation}
				</Box>
			</BrowserRouter>
		</Box>
	)
}

export default Layout
