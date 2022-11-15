/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { defaultParams } from '../index.js'
import { getScheme, validateParams } from '../scheme/HsluvColorLogic.js'

const NEUTRAL_GREYS = [
	'#f5f5f5',
	'#dddddd',
	'#c5c5c5',
	'#aeaeae',
	'#979797',
	'#818181',
	'#6c6c6c',
	'#575757',
	'#434343',
	'#303030',
]

const TINTED_GREYS = [
	'#f6f5f3',
	'#e0ddd5',
	'#c8c5be',
	'#b0aea7',
	'#999791',
	'#83817c',
	'#6d6c67',
	'#585754',
	'#444340',
	'#31302e',
]

const SEQUENTIAL1 = ['#f5f5f5', '#e0d1c5', '#d7ac7e', '#bd8c49', '#a06d00']

const SEQUENTIAL2 = ['#f5f5f5', '#d9d1df', '#c7a9da', '#be78e5', '#c200fb']

const DIVERGING = [
	'#00894b',
	'#52aa73',
	'#87c69c',
	'#b7ddc3',
	'#e3ebe5',
	'#ebe9e7',
	'#e0d1c4',
	'#dab186',
	'#c19050',
	'#a06d00',
]

// TODO: test light v dark

describe('getScheme', () => {
	test('creates neutral grey scales (no saturation)', () => {
		const scheme = getScheme(
			{
				accentHue: 50,
				accentSaturation: 50,
				accentLightness: 50,
				greySaturation: 0,
			},
			10,
			10,
			true,
		)
		expect(scheme.greys).toEqual(NEUTRAL_GREYS)
	})

	test('creates tinted grey scales (default)', () => {
		const scheme = getScheme(
			{
				accentHue: 50,
				accentSaturation: 50,
				accentLightness: 50,
			},
			10,
			10,
			true,
		)
		expect(scheme.greys).toEqual(TINTED_GREYS)
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
				},
				1,
				10,
				true,
				{
					nominalHueStep: 3,
				},
			)
			expect(scheme.nominal).toHaveLength(1)
		})

		test('hue step > 10 (14)', () => {
			const scheme = getScheme(
				{
					accentHue: 50,
					accentSaturation: 50,
					accentLightness: 50,
				},
				2,
				10,
				true,
				{
					nominalHueStep: 14,
				},
			)
			expect(scheme.nominal).toHaveLength(2)
		})
	})

	describe('sequential scales', () => {
		test('creates sequential scales', () => {
			const scheme = getScheme(
				{
					accentHue: 50,
					accentSaturation: 50,
					accentLightness: 50,
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
		test('creates diverging scales', () => {
			const scheme = getScheme(
				{
					accentHue: 50,
					accentSaturation: 50,
					accentLightness: 50,
				},
				10,
				10,
				true,
			)
			expect(scheme.diverging).toEqual(DIVERGING)
		})
	})
})

describe('validateParams', () => {
	test('fill in defaults', () => {
		const params = validateParams({
			accentHue: 100,
			accentLightness: 100,
			accentSaturation: 100,
		})
		expect(params.greyHue).toBe(defaultParams.greyHue)
		expect(params.greySaturation).toBe(defaultParams.greySaturation)
	})
})
