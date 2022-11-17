/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { load } from '@thematic/core'

import { vega } from '../index.js'

const theme = load()

const spec = {
	$schema: 'https://vega.github.io/schema/vega/v5.json',
}

describe('vega', () => {
	test('basic test', () => {
		const merged = vega(theme, spec, { width: 100, height: 300 })
		expect(merged.$schema).toBe(spec.$schema)
		expect(merged.height).toBe(300)
		expect(merged.width).toBe(100)
		expect(merged.config?.group.fill).toBe(theme.plotArea().fill().hex())
		expect(merged.config?.range?.category).toHaveLength(10)
		expect(merged.config?.range?.ramp).toHaveLength(100)
	})

	test('vega scale length override', () => {
		const merged = vega(theme, spec, {
			width: 100,
			height: 300,
			nominalCount: 13,
			sequentialCount: 9,
		})
		expect(merged.config?.range?.category).toHaveLength(13)
		expect(merged.config?.range?.ramp).toHaveLength(9)
	})
})
