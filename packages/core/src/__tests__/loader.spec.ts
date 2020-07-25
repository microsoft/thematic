/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { load } from '../loader'
import { ThemeVariant } from '../types'

describe('load', () => {
	// these are variants from the theme json for arc.stroke - they could change if we change the json!
	const STROKE_CSS = '#c5c5c5'

	test('zero-config load (light theme)', () => {
		const theme = load()
		expect(theme.name).toBe('Default')
		expect(theme.variant).toBe('light')
		expect(
			theme
				.chart()
				.backgroundColor()
				.hex(),
		).toBe('none')
		expect(
			theme
				.arc()
				.stroke()
				.hex(),
		).toBe(STROKE_CSS)
		expect(
			theme
				.text()
				.fill()
				.hex(),
		).toBe('#303030')
	})

	test('load dark theme', () => {
		const theme = load({
			variant: ThemeVariant.Dark,
		})
		expect(theme.name).toBe('Default')
		expect(theme.variant).toBe('dark')
		expect(
			theme
				.chart()
				.backgroundColor()
				.hex(),
		).toBe('none')
		expect(
			theme
				.arc()
				.stroke()
				.hex(),
		).toBe('#323232')
		expect(
			theme
				.text()
				.fill()
				.hex(),
		).toBe('#e2e2e2')
	})
})
