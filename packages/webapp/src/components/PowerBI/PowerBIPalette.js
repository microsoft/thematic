import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematic } from '@thematic/react'
import { ColorStrip } from '../ColorStrip'
const mainKeys = ['foreground', 'background', 'tableAccent']
export const PowerBIPalette = ({ colors }) => {
	const theme = useThematic()
	const mapkeys = keys =>
		keys.map(key => ({
			color: colors[key],
			label: key,
			secondaryLabel: colors[key],
		}))
	const mains = mapkeys(mainKeys)
	const dataColorsLeft = colors.dataColors.slice(0, 6).map(c => ({
		color: c,
		label: c,
	}))
	const dataColorsRight = colors.dataColors.slice(6).map(c => ({
		color: c,
		secondaryLabel: c,
	}))
	const styles = {
		root: {
			display: 'flex',
		},
		header: {
			color: theme.application().foreground().hex(),
			fontSize: 14,
		},
		swatch: {
			border: `1px solid ${theme.application().border().hex()}`,
		},
	}
	return _jsxs(
		'div',
		{
			style: styles.root,
			children: [
				_jsxs(
					'div',
					{
						children: [
							_jsx(
								'div',
								{ style: styles.header, children: 'Primary' },
								void 0,
							),
							_jsx(
								ColorStrip,
								{
									vertical: true,
									colorDefinitions: mains,
									swatchStyle: styles.swatch,
								},
								void 0,
							),
						],
					},
					void 0,
				),
				_jsxs(
					'div',
					{
						children: [
							_jsx(
								'div',
								{ style: styles.header, children: 'Data Colors' },
								void 0,
							),
							_jsxs(
								'div',
								{
									style: { display: 'flex', alignItems: ' flex-start' },
									children: [
										_jsx(
											ColorStrip,
											{
												vertical: true,
												colorDefinitions: dataColorsLeft,
												swatchStyle: styles.swatch,
											},
											void 0,
										),
										_jsx(
											ColorStrip,
											{
												vertical: true,
												colorDefinitions: dataColorsRight,
												swatchStyle: styles.swatch,
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
				),
			],
		},
		void 0,
	)
}
