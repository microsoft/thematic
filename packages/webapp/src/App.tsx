/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { connect } from 'react-redux'
import { ControlPanel } from './components/ControlPanel'
import { ThemeEditor } from './components/ThemeEditor'
import { ThemeViewer } from './components/ThemeViewer'
import { Theme } from '@thematic/core'
import { ThematicFluentProvider } from '@thematic/fluent'
import { ApplicationStyles } from '@thematic/react'

import './App.css'

interface AppProps {
	theme: Theme
}

const AppComponent = ({ theme }: AppProps) => (
	<ThematicFluentProvider theme={theme}>
		<ApplicationStyles />
		<div className="App">
			<div
				className="controls"
				style={{
					backgroundColor: theme.application().faint().hex(),
					borderBottom: `1px solid ${theme.application().lowContrast().hex()}`,
				}}
			>
				<ControlPanel />
			</div>
			<div className="main">
				<div className="editor">
					<ThemeEditor />
				</div>
				<div className="viewer">
					<ThemeViewer />
				</div>
			</div>
		</div>
	</ThematicFluentProvider>
)

export const App = connect((state: any) => ({
	theme: state.theme,
}))(AppComponent)
