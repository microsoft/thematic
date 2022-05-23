/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './MainPage.css'

import { useThematic } from '@thematic/react'
import type { FC } from 'react'

import { ControlPanel } from './components/ControlPanel/ControlPanel.js'
import { ThemeEditor } from './components/ThemeEditor/ThemeEditor.js'
import { ThemeViewer } from './components/ThemeViewer/ThemeViewer.js'

export const MainPage: FC = () => {
	const theme = useThematic()
	return (
		<div className="app">
			<div
				style={{
					backgroundColor: theme.application().faint().hex(),
					borderBottom: `1px solid ${theme.application().border().hex()}`,
				}}
			>
				<ControlPanel />
			</div>
			<div className="main">
				<div className="theme-editor">
					<ThemeEditor />
				</div>
				<div className="theme-viewer">
					<ThemeViewer />
				</div>
			</div>
		</div>
	)
}
