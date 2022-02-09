/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ThematicFluentProvider } from '@thematic/fluent'
import { ApplicationStyles } from '@thematic/react'
import { FC } from 'react'
import { useTheme } from '../../state'
import { ControlPanel } from '../ControlPanel'
import { ThemeEditor } from '../ThemeEditor'
import { ThemeViewer } from '../ThemeViewer'

import './App.css'
import { DataContext } from './DataContext'

const AppComponent = () => {
	const theme = useTheme()
	return (
		<ThematicFluentProvider theme={theme}>
			<ApplicationStyles />
			<div className="App">
				<div
					className="controls"
					style={{
						backgroundColor: theme.application().faint().hex(),
						borderBottom: `1px solid ${theme.application().border().hex()}`,
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
}

export const App: FC = () => {
	return (
		<DataContext>
			<AppComponent />
		</DataContext>
	)
}
