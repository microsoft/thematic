/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { css2rgba } from '@thematic/color'

import type { Theme, Transformer } from '../types/index.js'

/**
 * Creates a text string of the scheme colors compatible with GIMP/Inkscape palette files (*.gpl)
 * @param theme - the theme
 */
export const gimp: Transformer<string> = (theme: Theme) => {
	const headers = [
		'GIMP Palette',
		`Name: ${theme.name} - ${theme.variant}`,
		'# This palette is auto-generated by thematic, and contains all of the core color mappings',
	]
	const lines = Object.entries(theme.scheme).reduce((acc: string[], cur) => {
		const [key, value] = cur
		if (Array.isArray(value)) {
			value.forEach((val, idx) => {
				const { r, g, b } = css2rgba(val)
				acc.push(`${r} ${g} ${b}\t${val as string} ${key}[${idx}]`)
			})
		} else {
			const { r, g, b } = css2rgba(value)
			acc.push(`${r} ${g} ${b}\t${value as string} ${key}`)
		}
		return acc
	}, [])
	return [...headers, ...lines].join('\n')
}
