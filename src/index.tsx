import React from 'react'
import ReactDOM from 'react-dom'
import { Grommet } from 'grommet'
import { baseColor, theme } from './theme'
import { ChainId, Config, DAppProvider } from '@usedapp/core'
import Layout from './layout/Layout'

const config: Config = {
	readOnlyChainId: ChainId.Theta,
	autoConnect: true,
}

ReactDOM.render(
	<React.StrictMode>
		<Grommet theme={theme} full background={baseColor}>
			<DAppProvider config={config}>
				<Layout />
			</DAppProvider>
		</Grommet>
	</React.StrictMode>,
	document.getElementById('root')
)
