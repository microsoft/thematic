/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import chroma from 'chroma-js'
import { correctShades } from '../shades'

describe('theme shading correction functions', () => {
	// many of the shades for these sets will be a perfect match, but there are a few with slight
	// differences in the resulting hex code. none should be greater than 3, which is very close.
	// this was computed with a distance minimizing function for each shade (resulting config in shades.ts)
	const colorDistance = 3

	test('fluent default example', () => {
		// this is the default fluent palette
		// see https://github.com/microsoft/fluentui/blob/master/packages/react/src/components/ThemeGenerator/ThemeRulesStandard.ts
		const palette = {
			foregroundColor: '#323130',
			backgroundColor: '#ffffff',
			black: '#000000',
			neutralDark: '#201f1e',
			neutralLight: '#edebe9',
			neutralLighter: '#f3f2f1',
			neutralLighterAlt: '#faf9f8',
			neutralPrimary: '#323130',
			neutralPrimaryAlt: '#3b3a39',
			neutralQuaternary: '#d0d0d0',
			neutralQuaternaryAlt: '#e1dfdd',
			neutralSecondary: '#605e5c',
			neutralTertiary: '#a19f9d',
			neutralTertiaryAlt: '#c8c6c4',
			white: '#ffffff',
		}

		const fixed = correctShades(palette, false)

		Object.keys(palette).forEach(key => {
			const dist = chroma.distance(palette[key], fixed[key], 'rgb')
			expect(dist).toBeLessThan(colorDistance)
		})
	})

	test('fluent dark example', () => {
		// there is no default dark fluent theme, so we used this exampe to tune the shades for similar results
		// https://github.com/microsoft/fluentui/blob/789a3733b128569190319fce3fe2b46900b24896/packages/theme-samples/src/DarkCustomizations/DarkCustomizations.ts
		const palette = {
			foregroundColor: '#f3f2f1',
			backgroundColor: '#1b1a19',
			black: '#ffffff',
			neutralDark: '#faf9f8',
			neutralPrimary: '#f3f2f1',
			neutralPrimaryAlt: '#c8c6c4',
			neutralSecondary: '#a19f9d',
			neutralSecondaryAlt: '#979693',
			neutralTertiary: '#797775',
			neutralTertiaryAlt: '#484644',
			neutralQuaternary: '#3b3a39',
			neutralQuaternaryAlt: '#323130',
			neutralLight: '#292827',
			neutralLighter: '#252423',
			neutralLighterAlt: '#201f1e',
			white: '#1b1a19',
		}

		const fixed = correctShades(palette, true)

		Object.keys(palette).forEach(key => {
			const dist = chroma.distance(palette[key], fixed[key], 'rgb')
			expect(dist).toBeLessThan(colorDistance)
		})
	})
})
