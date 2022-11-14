/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './MainPage.css';

import { useThematicFluent } from '@thematic/fluent';
import type { FC } from 'react';

import { ControlPanel } from './components/ControlPanel/ControlPanel.js';
import { ThemeEditor } from './components/ThemeEditor/ThemeEditor.js';
import { ThemeViewer } from './components/ThemeViewer/ThemeViewer.js';

export const MainPage: FC = () => {
	const theme = useThematicFluent();
	return (
		<div className="app">
			<div
				style={{
					backgroundColor: theme.palette.neutralLighter,
					borderBottom: `1px solid ${theme.palette.neutralTertiaryAlt}`,
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
	);
};
