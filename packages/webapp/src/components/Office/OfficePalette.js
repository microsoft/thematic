import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematic } from '@thematic/react'
import { ColorStrip } from '../ColorStrip'
const mainKeys = [
	'dark1',
	'light1',
	'dark2',
	'light2',
	'hyperlink',
	'followedHyperlink',
]
const accentKeys = [
	'accent1',
	'accent2',
	'accent3',
	'accent4',
	'accent5',
	'accent6',
]
export const OfficePalette = ({ colors }) => {
	const theme = useThematic()
	const mapkeys = keys =>
		keys.map(key => ({
			color: colors[key],
			label: key,
			secondaryLabel: colors[key],
		}))
	const mains = mapkeys(mainKeys)
	const accents = mapkeys(accentKeys)
	const styles = {
		root: {
			display: 'flex',
		},
		swatch: {
			border: `1px solid ${theme.application().border().hex()}`,
		},
		header: {
			color: theme.application().foreground().hex(),
			fontSize: 14,
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
							_jsx('div', { style: styles.header, children: 'Accent' }, void 0),
							_jsx(
								ColorStrip,
								{
									vertical: true,
									colorDefinitions: accents,
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
	)
}
