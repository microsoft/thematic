/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { Pivot, PivotItem } from '@fluentui/react'
import { CoolerPicker } from '../CoolerPicker'
import { ColorPalette } from '../ColorPalette'
import { JSONPane } from '../JSON'
import { Office } from '../Office'
import { FluentViewer } from '../FluentViewer'
import { MarkGrid } from '../MarkGrid'
import { GimpEditor } from '../GIMP'
import { PowerBiEditor } from '../PowerBI'
import './index.css'

export interface ThemeEditorProps {
	scaleItemCount: number
}

export const ThemeEditor: React.FC<ThemeEditorProps> = ({ scaleItemCount }) => {
	return (
		<div className="editor-wrapper">
			<Pivot>
				<PivotItem className="tab" headerText="Cooler Picker">
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
			<div className="privacy">
				This site does not collect any personal information or use
				cookies.&nbsp;
				<a
					target="_blank"
					rel="noreferrer"
					href="https://privacy.microsoft.com/en-us/privacystatement/"
				>
					Read Microsoft's statement on Privacy and Cookies.
				</a>
			</div>
		</div>
	)
}
