/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { load } from '../loader.js'
import { ThemeVariant } from '../types/index.js'

describe('load', () => {
	test('zero-config load (light theme)', () => {
		const theme = load()
		expect(theme.name).toBe('Default')
		expect(theme.variant).toBe(ThemeVariant.Light)
		expect(theme.dark).toBe(false)
		expect(theme.chart().backgroundColor().hex()).toBe('none')
		expect(theme.arc().stroke().hex()).toBe('#c8c5be')
		expect(theme.text().fill().hex()).toBe('#31302e')
	})

	test('load dark theme', () => {
		const theme = load({
			dark: true,
		})
		expect(theme.name).toBe('Default')
		expect(theme.variant).toBe(ThemeVariant.Dark)
		expect(theme.dark).toBe(true)
		expect(theme.chart().backgroundColor().hex()).toBe('none')
		expect(theme.arc().stroke().hex()).toBe('#333230')
		expect(theme.text().fill().hex()).toBe('#e5e2db')
	})
})
