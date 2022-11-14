/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { getScheme } from '../scheme/HsluvColorLogic.js'

const GREYS = [
	'#e8e8e8',
	'#d1d1d1',
	'#bbbbbb',
	'#a6a6a6',
	'#919191',
	'#7c7c7c',
	'#686868',
	'#555555',
	'#424242',
	'#303030',
]
const SEQUENTIAL1 = ['#e8e8e8', '#dac7b7', '#d0a67a', '#ba8947', '#a06d00']

const SEQUENTIAL2 = ['#e8e8e8', '#dbc8af', '#c8a97a', '#b18d47', '#977100']

const DIVERGING = [
	'#00894b',
	'#50a771',
	'#82bf97',
	'#afd3ba',
	'#d3e1d7',
	'#e1ddd9',
	'#dac7b6',
	'#d2ab81',
	'#bd8d4e',
	'#a06d00',
]

// TODO: test light v dark

describe('getScheme', () => {
	test('can create grey scales', () => {
		const scheme = getScheme(
			{
				accentHue: 50,
				accentSaturation: 50,
				accentLightness: 50,
				backgroundLevel: 50,
				backgroundHueShift: 50,
				nominalHueStep: 50,
			},
			10,
			10,
			true,
		)
		expect(scheme.greys).toEqual(GREYS)
	})

	describe('nominal count matches requested size', () => {
		// the hue initial hue count establishes starting spacing
		// but this can result in mismatched final counts
		// ensure that the resulting nominal scales are trimmed correctly
		test('default hue step (10)', () => {
			const scheme = getScheme(
				{
					accentHue: 50,
					accentSaturation: 50,
					accentLightness: 50,
					backgroundLevel: 50,
					backgroundHueShift: 50,
					nominalHueStep: 50,
				},
				1,
				10,
				true,
			)
			expect(scheme.nominal).toHaveLength(1)
		})

		test('hue step < 10 (3)', () => {
			const scheme = getScheme(
				{
					accentHue: 50,
					accentSaturation: 50,
					accentLightness: 50,
					backgroundLevel: 50,
					backgroundHueShift: 50,
					nominalHueStep: 3,
				},
				1,
				10,
				true,
			)
			expect(scheme.nominal).toHaveLength(1)
		})

		test('hue step > 10 (14)', () => {
			const scheme = getScheme(
				{
					accentHue: 50,
					accentSaturation: 50,
					accentLightness: 50,
					backgroundLevel: 50,
					backgroundHueShift: 50,
					nominalHueStep: 14,
				},
				2,
				10,
				true,
			)
			expect(scheme.nominal).toHaveLength(2)
		})
	})

	describe('sequential scales', () => {
		test('can create sequential scales', () => {
			const scheme = getScheme(
				{
					accentHue: 50,
					accentSaturation: 50,
					accentLightness: 50,
					backgroundLevel: 50,
					backgroundHueShift: 50,
					nominalHueStep: 50,
				},
				10,
				5,
				true,
			)
			expect(scheme.sequential).toEqual(SEQUENTIAL1)
			expect(scheme.sequential2).toEqual(SEQUENTIAL2)
		})
	})

	describe('diverging scales', () => {
		test('can create diverging scales', () => {
			const scheme = getScheme(
				{
					accentHue: 50,
					accentSaturation: 50,
					accentLightness: 50,
					backgroundLevel: 50,
					backgroundHueShift: 50,
					nominalHueStep: 50,
				},
				10,
				10,
				true,
			)
			expect(scheme.diverging).toEqual(DIVERGING)
		})
	})
})
