/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { css2css, css2rgbaint, css2rgbav } from '../chroma.js'

describe('color conversion functions', () => {
	describe('css2css', () => {
		test('none', () => {
			const value = css2css('none')
			expect(value).toBe('transparent')
		})
	})

	describe('css => rgba vector', () => {
		test('default opacity in hex string', () => {
			const value = css2rgbav('#1f77b4')
			expect(value).toEqual([
				0.12156862745098039, 0.4666666666666667, 0.7058823529411765, 1,
			])
		})

		test('override opacity with alpha param', () => {
			const value = css2rgbav('#1f77b4', 0.5)
			expect(value).toEqual([
				0.12156862745098039, 0.4666666666666667, 0.7058823529411765, 0.5,
			])
		})

		test('css "none" value', () => {
			const value = css2rgbav('none')
			expect(value).toEqual([0, 0, 0, 0])
		})
	})

	describe('css => rgba number', () => {
		test('full opacity black', () => {
			const value = css2rgbaint('black')
			expect(value).toBe(-16777216)
		})

		test('zero opacity black', () => {
			const value = css2rgbaint('black', 0)
			expect(value).toBe(0)
		})

		test('full opacity red', () => {
			const value = css2rgbaint('red', 1)
			expect(value).toBe(-16776961)
		})

		test('zero opacity red', () => {
			const value = css2rgbaint('red', 0)
			expect(value).toBe(255)
		})

		test('css "none" value', () => {
			const value = css2rgbaint('none')
			expect(value).toBe(0)
		})
	})

	describe('css => css (rgb or rgba)', () => {
		test('red', () => {
			const value = css2css('red')
			expect(value).toBe('rgb(255,0,0)')
		})
		test('red with alpha', () => {
			const value = css2css('red', 0.5)
			expect(value).toBe('rgba(255,0,0,0.5)')
		})
	})
})
