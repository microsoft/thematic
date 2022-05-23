/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './ThemeEditor.css'

import { Pivot, PivotItem } from '@fluentui/react'
import type { FC } from 'react'

import { ColorPicker } from './panes/ColorPickerPane/index.js'
import { FluentPane } from './panes/FluentPane.js'
import { GimpPane } from './panes/GimpPane.js'
import { JSONPane } from './panes/JSONPane.js'
import { MarkGrid } from './panes/MarksPane/index.js'
import { OfficePane } from './panes/OfficePane.js'
import { PowerBIPane } from './panes/PowerBIPane.js'
import { ThemeColors } from './ThemeColors/index.js'

export interface ThemeEditorProps {
	scaleItemCount: number
}

export const ThemeEditor: FC<ThemeEditorProps> = ({ scaleItemCount }) => {
	return (
		<div className="editor-wrapper">
			<Pivot>
				<PivotItem className="tab" headerText="Color Picker">
					<ColorPicker />
				</PivotItem>
				<PivotItem className="tab" headerText="Marks">
					<MarkGrid />
				</PivotItem>
				<PivotItem className="tab" headerText="Fluent UI">
					<FluentPane />
				</PivotItem>
				<PivotItem className="tab" headerText="Office">
					<OfficePane />
				</PivotItem>
				<PivotItem className="tab" headerText="Power BI">
					<PowerBIPane />
				</PivotItem>
				<PivotItem className="tab" headerText="GIMP">
					<GimpPane />
				</PivotItem>
				<PivotItem className="tab" headerText="JSON">
					<JSONPane />
				</PivotItem>
			</Pivot>
			<ThemeColors scaleItemCount={scaleItemCount} />
			<div className="footer">
				<div className="privacy">
					This site does not collect any personal information or use
					cookies.&nbsp;
					<a
						target="_blank"
						rel="noreferrer"
						href="https://privacy.microsoft.com/en-us/privacystatement/"
					>
						Read Microsoft&apos;s statement on Privacy and Cookies
					</a>
					.
				</div>
				<div className="github">
					Contribute at&nbsp;
					<a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/microsoft/thematic"
					>
						GitHub
					</a>
					.
				</div>
			</div>
		</div>
	)
}
