/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Color } from '../Color.js'

describe('Color class', () => {
	test('red', () => {
		const c = new Color('red')
		const hex = c.hex()
		expect(hex).toBe('#ff0000')
	})
	test('none', () => {
		const c = new Color('none')
		const hex = c.hex()
		expect(hex).toBe('none')
	})
	describe('Color alpha', () => {
		test('ctor alpha', () => {
			const c = new Color('red', 0.5)
			const rgbav = c.rgbav()
			expect(rgbav).toEqual([1, 0, 0, 0.5])
		})
		test('override alpha', () => {
			const c = new Color('red')
			const rgbav = c.rgbav(0.25)
			expect(rgbav).toEqual([1, 0, 0, 0.25])
		})
	})
	test('toString returns hex value', () => {
		const c = new Color('red')
		expect(c.toString()).toBe('#ff0000')
	})
})
