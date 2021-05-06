/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Pivot, PivotItem } from '@fluentui/react'
import React from 'react'
import { ColorPalette } from '../ColorPalette'
import { CoolerPicker } from '../CoolerPicker'
import { FluentViewer } from '../FluentViewer'
import { GimpEditor } from '../GIMP'
import { JSONPane } from '../JSON'
import { MarkGrid } from '../MarkGrid'
import { Office } from '../Office'
import { PowerBiEditor } from '../PowerBI'
import './index.css'

export interface ThemeEditorProps {
	scaleItemCount: number
}

export const ThemeEditor: React.FC<ThemeEditorProps> = ({ scaleItemCount }) => {
	return (
		<div className="editor-wrapper">
			<Pivot>
				<PivotItem className="tab" headerText="Color Picker">
					<CoolerPicker />
				</PivotItem>
				<PivotItem className="tab" headerText="Marks">
					<MarkGrid />
				</PivotItem>
				<PivotItem className="tab" headerText="Fluent UI">
					<FluentViewer />
				</PivotItem>
				<PivotItem className="tab" headerText="Office">
					<Office />
				</PivotItem>
				<PivotItem className="tab" headerText="Power BI">
					<PowerBiEditor />
				</PivotItem>
				<PivotItem className="tab" headerText="GIMP">
					<GimpEditor />
				</PivotItem>
				<PivotItem className="tab" headerText="JSON">
					<JSONPane />
				</PivotItem>
			</Pivot>
			<ColorPalette scaleItemCount={scaleItemCount} />
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
