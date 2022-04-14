/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import cb from 'color-blind'

import type { ColorBlindnessMeta, Scheme } from './interfaces.js'
import { ColorBlindnessMode } from './interfaces.js'

const noop = (color: string) => color

/**
 * Returns a copy of a Thematic Scheme with color blindness simulation applied.
 *
 * @param scheme - the color scheme
 * @param mode - the colorblindness mode
 */
export function colorBlindness(
	scheme: Scheme,
	mode?: ColorBlindnessMode,
): Scheme {
	const m = mode || ColorBlindnessMode.None
	const fnName = ColorBlindnessMode[m]?.toLowerCase()
	if (!fnName) {
		throw new Error(
			`could not find ColorBlindnessMode "${JSON.stringify(mode)}"`,
		)
	}
	const fn = cb[fnName] || noop
	return Object.entries(scheme).reduce((acc, cur) => {
		const [key, value] = cur
		if (Array.isArray(value)) {
			acc[key] = value.map(c => fn(c))
		} else {
			acc[key] = fn(value)
		}
		return acc
	}, {} as Record<string, any>) as Scheme
}

type CBMetaMap = Record<string, { incidence: number; description: string }>

const cbMeta: CBMetaMap = {
	None: {
		incidence: 0.92,
		description: 'Normal color vision',
	},
	Deuteranomaly: {
		incidence: 0.06,
		description: 'Red/green due to mutated green pigment',
	},
	Protanomaly: {
		incidence: 0.01,
		description: 'Red/green due to mutated red pigment',
	},
	Protanopia: {
		incidence: 0.01,
		description: 'Red/green due to missing red cones',
	},
	Deuteranopia: {
		incidence: 0.01,
		description: 'Red/green due to missing green cones',
	},
	Tritanopia: {
		incidence: 0.01,
		description: 'Blue/yellow due to missing blue cones',
	},
	Tritanomaly: {
		incidence: 0.001,
		description: 'Blue/yellow due to mutated blue pigment',
	},
	Achromatopsia: {
		incidence: 0.003,
		description:
			'No color, often due to retinal transduction pathway, extremely rare',
	},
}

/**
 * Returns the indicence rates and description of a given colorblindess mode.
 *
 * @param mode - the colorblindness mode
 */
export function colorBlindnessInfo(
	mode: ColorBlindnessMode,
): ColorBlindnessMeta {
	const key = ColorBlindnessMode[mode] as string
	if (!key) {
		throw new Error(`could not find ColorBlindnessMode ${mode}`)
	}
	return cbMeta[key] as ColorBlindnessMeta
}
