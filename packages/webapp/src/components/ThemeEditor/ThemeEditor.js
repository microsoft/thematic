import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Pivot, PivotItem } from '@fluentui/react'
import { ColorPalette } from '../ColorPalette'
import { CoolerPicker } from '../CoolerPicker'
import { FluentViewer } from '../FluentViewer'
import { GimpEditor } from '../GIMP'
import { JSONPane } from '../JSON'
import { MarkGrid } from '../MarkGrid'
import { Office } from '../Office'
import { PowerBiEditor } from '../PowerBI'
import './index.css'
export const ThemeEditor = ({ scaleItemCount }) => {
	return _jsxs(
		'div',
		{
			className: 'editor-wrapper',
			children: [
				_jsxs(
					Pivot,
					{
						children: [
							_jsx(
								PivotItem,
								{
									className: 'tab',
									headerText: 'Color Picker',
									children: _jsx(CoolerPicker, {}, void 0),
								},
								void 0,
							),
							_jsx(
								PivotItem,
								{
									className: 'tab',
									headerText: 'Marks',
									children: _jsx(MarkGrid, {}, void 0),
								},
								void 0,
							),
							_jsx(
								PivotItem,
								{
									className: 'tab',
									headerText: 'Fluent UI',
									children: _jsx(FluentViewer, {}, void 0),
								},
								void 0,
							),
							_jsx(
								PivotItem,
								{
									className: 'tab',
									headerText: 'Office',
									children: _jsx(Office, {}, void 0),
								},
								void 0,
							),
							_jsx(
								PivotItem,
								{
									className: 'tab',
									headerText: 'Power BI',
									children: _jsx(PowerBiEditor, {}, void 0),
								},
								void 0,
							),
							_jsx(
								PivotItem,
								{
									className: 'tab',
									headerText: 'GIMP',
									children: _jsx(GimpEditor, {}, void 0),
								},
								void 0,
							),
							_jsx(
								PivotItem,
								{
									className: 'tab',
									headerText: 'JSON',
									children: _jsx(JSONPane, {}, void 0),
								},
								void 0,
							),
						],
					},
					void 0,
				),
				_jsx(ColorPalette, { scaleItemCount: scaleItemCount }, void 0),
				_jsxs(
					'div',
					{
						className: 'footer',
						children: [
							_jsxs(
								'div',
								{
									className: 'privacy',
									children: [
										'This site does not collect any personal information or use cookies.\u00A0',
										_jsx(
											'a',
											{
												target: '_blank',
												rel: 'noreferrer',
												href: 'https://privacy.microsoft.com/en-us/privacystatement/',
												children:
													"Read Microsoft's statement on Privacy and Cookies",
											},
											void 0,
										),
										'.',
									],
								},
								void 0,
							),
							_jsxs(
								'div',
								{
									className: 'github',
									children: [
										'Contribute at\u00A0',
										_jsx(
											'a',
											{
												target: '_blank',
												rel: 'noreferrer',
												href: 'https://github.com/microsoft/thematic',
												children: 'GitHub',
											},
											void 0,
										),
										'.',
									],
								},
								void 0,
							),
						],
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
