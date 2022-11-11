/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColorMaker } from '../scheme/HsluvColorLogic.js'

const GREYS = [
	[50, 0, 92],
	[50, 0, 84],
	[50, 0, 76],
	[50, 0, 68],
	[50, 0, 60],
	[50, 0, 52],
	[50, 0, 44],
	[50, 0, 36.000000000000007],
	[50, 0, 28],
	[50, 0, 20],
]

const SEQUENTIAL1 = [
	[50, 0, 92],
	[50, 25, 81.5],
	[50, 50, 71],
	[50, 75, 60.5],
	[50, 100, 50],
]

const SEQUENTIAL2 = [
	[58.57142857142857, 0, 92],
	[58.57142857142857, 25, 81.5],
	[58.57142857142857, 50, 71],
	[58.57142857142857, 75, 60.5],
	[58.57142857142857, 100, 50],
]

const DIVERGING = [
	[140, 100, 50],
	[140, 71.55417527999329, 61.947246382402824],
	[140, 46.47580015448901, 72.48016393511462],
	[140, 25.29822128134704, 81.37474706183424],
	[140, 8.944271909999161, 88.24340579780035],
	[50, 8.944271909999161, 88.24340579780035],
	[50, 25.29822128134704, 81.37474706183424],
	[50, 46.47580015448901, 72.48016393511462],
	[50, 71.55417527999329, 61.947246382402824],
	[50, 100, 50],
]

describe('ColorMaker', () => {
	test('can be instantiated', () => {
		expect(() => new ColorMaker([50, 50, 50], 50, 50, 50, true)).not.toThrow()
	})

	// TODO: test light v dark
	test('can create grey scales', () => {
		const colorMaker = new ColorMaker([50, 50, 50], 50, 50, 50, true)
		const greys = colorMaker.grey(10)
		expect(greys).toEqual(GREYS)
	})

	test('can create sequential scales', () => {
		const colorMaker = new ColorMaker([50, 50, 50], 50, 50, 50, true)
		const sequential1 = colorMaker.sequential(5)
		const sequential2 = colorMaker.sequential(5, 1)
		expect(sequential1).toEqual(SEQUENTIAL1)
		expect(sequential2).toEqual(SEQUENTIAL2)
	})

	test('can create diverging scales', () => {
		const colorMaker = new ColorMaker([50, 50, 50], 50, 50, 50, true)
		const diverging = colorMaker.diverging(10)
		expect(diverging).toEqual(DIVERGING)
	})

	describe('nominal count matches requested size', () => {
		// the hue initial hue count establishes starting spacing
		// but this can result in mismatched final counts
		// ensure that the resulting nominal scales are trimmed correctly
		test('default hue step (10)', () => {
			const colorMaker = new ColorMaker([50, 50, 50], 50, 50, 10, true)
			const scale = colorMaker.nominal(1)
			expect(scale.size).toBe(1)
		})

		test('hue step < 10 (3)', () => {
			const colorMaker = new ColorMaker([50, 50, 50], 50, 50, 3, true)
			const scale = colorMaker.nominal(1)
			expect(scale.size).toBe(1)
		})

		test('hue step > 10 (14)', () => {
			const colorMaker = new ColorMaker([50, 50, 50], 50, 50, 14, true)
			const scale = colorMaker.nominal(2)
			expect(scale.size).toBe(2)
		})
	})
})
