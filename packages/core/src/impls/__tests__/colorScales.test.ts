/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { nominal, continuous } from '../colorScales'
import { ScaleType } from '../../types'

describe('nominal scale generators', () => {
	const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'pink', 'violet']

	test('stable color selection order', () => {
		// different instances of the scale can return different
		// colors for a given key if the data is sorted differently
		// the implementation hashes keys to use stable indexes
		const scale1 = nominal(colors)

		const color1 = scale1(1).hex()
		const color2 = scale1(6).hex()
		const color3 = scale1(5).hex()
		const color4 = scale1(2).hex()

		// repeat retrieval has the same colors
		expect(scale1(1).hex()).toBe(color1)
		expect(scale1(6).hex()).toBe(color2)
		expect(scale1(5).hex()).toBe(color3)
		expect(scale1(2).hex()).toBe(color4)

		// requesting the same colors later in a different order is fine
		expect(scale1(2).hex()).toBe(color4)
		expect(scale1(6).hex()).toBe(color2)
		expect(scale1(1).hex()).toBe(color1)
		expect(scale1(5).hex()).toBe(color3)

		// create a new scale and request the same keys in a different order
		// they must stay the same!
		const scale2 = nominal(colors)
		expect(scale2(2).hex()).toBe(color4)
		expect(scale2(6).hex()).toBe(color2)
		expect(scale2(1).hex()).toBe(color1)
		expect(scale2(5).hex()).toBe(color3)
	})

	test('empty nominal scale', () => {
		// if a nominal scale is requested with zero items, we pass undefined to the Color constructor
		// make sure this comes out as 'none'
		const scale = nominal([])
		const color1 = scale(1).hex()
		const color2 = scale(2).hex()
		expect(color1).toBe('none')
		expect(color2).toBe('none')
	})

	test('explicit string input domain values', () => {
		const colorSubset = colors.slice(0, 3)
		const reference = nominal(colorSubset)
		const keys = ['bob', 'carol', 'adam']
		const scale = nominal(colorSubset, keys)
		const ref1 = reference(0).hex()
		const ref2 = reference(1).hex()
		const ref3 = reference(2).hex()
		// the color values should match a sorted order of the input domain
		expect(scale('adam').hex()).toBe(ref1)
		expect(scale('bob').hex()).toBe(ref2)
		expect(scale('carol').hex()).toBe(ref3)
		expect(scale('bob').hex()).toBe(ref2)
	})

	test('explicit numeric input domain values', () => {
		const colorSubset = colors.slice(0, 3)
		const reference = nominal(colorSubset)
		// note that these will sort like strings as 1.., 3.., 6..
		const keys = [1090921831840, 601295451416, 352187724013]
		const scale = nominal(colorSubset, keys)
		const ref1 = reference(0).hex()
		const ref2 = reference(1).hex()
		const ref3 = reference(2).hex()
		// the color values should match a _natural_ sorted order of the input domain
		expect(scale(keys[0]).hex()).toBe(ref1)
		expect(scale(keys[2]).hex()).toBe(ref2)
		expect(scale(keys[1]).hex()).toBe(ref3)
	})

	describe('scale.toArray length options', () => {
		const scale = nominal(colors)

		test('empty toArray uses nominal ctor colors', () => {
			expect(scale.toArray()).toHaveLength(colors.length)
		})

		test('empty toArray uses domain colors if supplied', () => {
			const domainScale = nominal(colors, ['1', '2', '3'])
			expect(domainScale.toArray()).toHaveLength(3)
		})

		test('explicit toArray param is used when provided', () => {
			// otherwise, we can supply an explicit length param
			expect(scale.toArray(2)).toHaveLength(2)
		})
	})
})

describe('continuous scale generators', () => {
	const colors = ['red', 'grey', 'black']

	test('linear scale bounds, including clamping', () => {
		const scale = continuous(colors, [0, 1], ScaleType.Linear)

		expect(scale(0).hex()).toBe('#ff0000')
		expect(scale(0.5).hex()).toBe('#808080')
		expect(scale(1).hex()).toBe('#000000')

		expect(scale(-1).hex()).toBe('#ff0000')
		expect(scale(2).hex()).toBe('#000000')
	})

	test('log scale bounds, including clamping', () => {
		// note the use of 0 in the domain, to test safety correction for log
		const scale = continuous(colors, [0, 1], ScaleType.Log)

		expect(scale(0).hex()).toBe('#ff0000')
		expect(scale(0.5).hex()).toBe('#808080')
		expect(scale(1).hex()).toBe('#000000')

		expect(scale(-1).hex()).toBe('#ff0000')
		expect(scale(2).hex()).toBe('#000000')
	})
})
