/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Color } from '../Color.js'
import type { Scheme } from '../interfaces.js'

/**
 * Extracts a thematic Color using its scheme "path".
 * @param scheme
 * @param path
 */
export function getNamedSchemeColor(scheme: Scheme, path?: string): Color {
	if (!path || path === 'none') {
		return new Color('none')
	}
	const indexed = indexedTest(path)
	if (indexed) {
		const selectedScheme = scheme[indexed.name as keyof Scheme] as
			| string
			| string[]
		const css = selectedScheme[indexed.index as number] as string
		return new Color(css)
	}
	return new Color(scheme[path as keyof Scheme] as string)
}

function indexedTest(path: string) {
	const indexedName = path.match(/(\w+)\[/)
	const indexedIndex = path.match(/\[(\d{1,2})\]/)
	if (indexedName && indexedIndex) {
		return {
			name: indexedName[1],
			index: +indexedIndex![1]!,
		}
	}
}
