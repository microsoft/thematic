/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Color } from '../Color'
import { Scheme } from '../interfaces'

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
		return new Color((scheme as any)[indexed.name][indexed.index])
	}
	return new Color((scheme as any)[path])
}

function indexedTest(path: string) {
	const indexedName = path.match(/(\w+)\[/)
	const indexedIndex = path.match(/\[(\d{1,2})\]/)
	if (indexedName && indexedIndex) {
		return {
			name: indexedName[1],
			index: +indexedIndex[1],
		}
	}
}
