/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { defaultParams } from '@thematic/color'

import { Theme } from '../Theme.js'
import { ScaleType } from '../types/index.js'

const lightSpec = {
	name: 'light',
	params: defaultParams,
}

const lightConfig = {
	overrides: {
		rect: {
			fill: '#1f77b4',
			fillOpacity: 1.0,
			stroke: 'none',
		},
		arc: {
			stroke: '#fefefe',
			strokeOpacity: 1.0,
		},
	},
}

// these values may change based on the compute method of the color package
// TODO: mock this out better so it isn't unstable

const SCALE_VECTOR = [
	0.9725490196078431, 0.5490196078431373, 0.5529411764705883, 1.0,
]
const SCALE_NUMBER = -7500552

// these are variants from the mock theme config above
const STROKE_VECTOR = [
	0.996078431372549, 0.996078431372549, 0.996078431372549, 1.0,
]
const STROKE_NUMBER = -65794

describe('clone', () => {
	// TODO: these props all deal with non-ColorPicker-driven values, since they are computed and therefore updated dynamically
	// TODO: all color values are now computed, so the mock values above are not accurate anyway
	const theme = new Theme(lightSpec, lightConfig)

	test('no changes', () => {
		const clone = theme.clone()
		expect(clone.name).toBe(theme.name)
		expect(clone.rect().stroke().hex()).toBe(theme.rect().stroke().hex())
	})

	test('basic property changes', () => {
		const clone = theme.clone(
			{
				name: 'lighter',
			},
			{
				overrides: {
					rect: {
						stroke: 'red',
					},
				},
			},
		)

		expect(clone.name).toBe('lighter')
		expect(clone.rect().stroke().hex()).toBe('#ff0000')
	})

	test('basic config change + swap color space', () => {
		const clone = theme.clone(
			{},
			{
				overrides: {
					rect: {
						stroke: 'red',
						strokeOpacity: 1.0,
					},
				},
			},
		)

		expect(clone.rect().stroke().rgbav()).toEqual([1.0, 0, 0, 1.0])
	})

	test('default nominal scale', () => {
		// confirm that the default uses 10
		const scale = theme.scales().nominal()
		const arr = scale.toArray()
		expect(arr).toHaveLength(10)
	})

	test('computed nominal scale', () => {
		const scale = theme.scales().nominal(10)
		const arr = scale.toArray()
		// the size-based nominal hashes the string keys
		// 'first' becomes 2, so we expect it to match the third value
		expect(scale('first').hex()).toBe(arr[2])
	})

	test('list-based nominal scale', () => {
		// expect these values to sort natural as [first, second]
		const scale = theme.scales().nominal(['second', 'first'])
		const arr = scale.toArray()
		expect(scale('first').hex()).toBe(arr[0])
		expect(scale('second').hex()).toBe(arr[1])
	})

	test('safe log scale', () => {
		const scale = theme.scales().sequential([0, 1], ScaleType.Log)
		const arr = scale.toArray()
		// zero values should be clamped automatically
		expect(scale(0).hex()).toBe(arr[0])
	})
})

describe('apply config', () => {
	describe('mark overrides', () => {
		const theme = new Theme(lightSpec, {
			...lightConfig,
			overrides: {
				arc: {
					stroke: 'red',
				},
			},
		})

		test('any optional mark properties', () => {
			expect(theme.arc().stroke().hex()).toBe('#ff0000')
		})
	})

	describe('color space transform => RGBA_VECTOR', () => {
		const theme = new Theme(lightSpec, lightConfig)

		test('basic color', () => {
			expect(theme.arc().stroke().rgbav()).toEqual(STROKE_VECTOR)
		})

		test('computed nominal scale', () => {
			const scale = theme.scales().nominal(10)
			expect(scale('first').rgbav()).toEqual(SCALE_VECTOR)
		})
	})

	describe('color space transform => RGBA_NUMBER', () => {
		const theme = new Theme(lightSpec, lightConfig)

		test('basic color', () => {
			expect(theme.arc().stroke().rgbaint()).toBe(STROKE_NUMBER)
		})

		test('computed nominal scale', () => {
			const scale = theme.scales().nominal(10)
			expect(scale('first').rgbaint()).toBe(SCALE_NUMBER)
		})
	})
})
