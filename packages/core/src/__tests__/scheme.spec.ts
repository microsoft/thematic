/*?
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Scheme } from '@thematic/color'

import { computeDefinition } from '../scheme.js'

const definition = {}

const scheme: Partial<Scheme> = {
	background: '#111111',
	offsetBackground: '#222222',
	foreground: '#333333',
	accent: '#444444',
	faintAnnotation: '#555555',
	lowContrastAnnotation: '#666666',
	midContrastAnnotation: '#777777',
	highContrastAnnotation: '$888888',
	sequential: ['#111111', '#222222'],
	sequential2: ['#333333', '#444444'],
	diverging: ['#555555', '#666666'],
	diverging2: ['#777777', '#888888'],
	nominalBold: ['darkred', 'darkblue'],
	nominal: ['red', 'blue'],
	nominalMuted: ['lightred', 'lightblue'],
	greys: ['lightgrey', 'darkgrey'],
	warning: 'orange',
	error: 'red',
	dataPrimary: '#999999',
	dataPrimaryMuted: '#99999e',
	dataPrimaryBold: '#99999f',
}
describe('scheme overlays', () => {
	describe('computeDefinition', () => {
		const def = computeDefinition(definition, scheme as Scheme)
		test('single props', () => {
			expect(def.application?.background).toBe(scheme.background)
			expect(def.plotArea?.fill).toBe(scheme.offsetBackground)
		})

		test('scale-based props', () => {
			expect(def.rect?.fill).toBe(scheme.dataPrimary)
		})

		test('signal props', () => {
			expect(def.rect?.suppressed?.fill).toBe(scheme.dataPrimaryMuted)
			expect(def.rect?.hovered?.fill).toBe(scheme.dataPrimaryBold)
			expect(def.rect?.selected?.fill).toBe(scheme.dataPrimaryBold)
		})
	})
})
