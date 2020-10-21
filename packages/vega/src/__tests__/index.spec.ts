/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { vega } from '../index'
import { load } from '@thematic/core'

const theme = load()

const spec = {
	$schema: 'https://vega.github.io/schema/vega/v5.json',
}

describe('vega index', () => {
	test('basic test', () => {
		const merged = vega(theme, spec, 100, 100)
		expect(merged.$schema).toBe(spec.$schema)
		expect(merged.height).toBe(100)
		expect(merged.width).toBe(100)
		expect(merged.config?.group.fill).toBe(theme.plotArea().fill().hex())
	})
})
