/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import cb from 'color-blind'

import type { ColorBlindnessMeta, Scheme } from './types.js'
import { ColorBlindnessMode } from './types.js'

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
	const fnName = mode || ColorBlindnessMode.None
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

type CBMetaMap = Record<string, ColorBlindnessMeta>

const cbMeta: CBMetaMap = {
	none: {
		incidence: 0.92,
		description: 'Normal color vision',
	},
	deuteranomaly: {
		incidence: 0.06,
		description: 'Red/green due to mutated green pigment',
	},
	rotanomaly: {
		incidence: 0.01,
		description: 'Red/green due to mutated red pigment',
	},
	rotanopia: {
		incidence: 0.01,
		description: 'Red/green due to missing red cones',
	},
	deuteranopia: {
		incidence: 0.01,
		description: 'Red/green due to missing green cones',
	},
	tritanopia: {
		incidence: 0.01,
		description: 'Blue/yellow due to missing blue cones',
	},
	tritanomaly: {
		incidence: 0.001,
		description: 'Blue/yellow due to mutated blue pigment',
	},
	achromatopsia: {
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
	const meta = cbMeta[mode]
	if (!meta) {
		throw new Error(`could not find info for ${mode}`)
	}
	return meta
}
