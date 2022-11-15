/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { hsluv2hex } from '../chroma.js'
import { defaultParams } from '../index.js'
import type { HslVector, Scheme, SchemeParams } from '../types'
import {
	getAnnotations,
	getBackgroundHsl,
	getDivergingSequence,
	getForegroundHsl,
	getGreyLightness,
	getNominalBoldSequence,
	getNominalHues,
	getNominalMutedSequence,
	getNominalSequence,
	getOffsetBackgroundHsl,
	getSequentialSequence,
	greySequence,
} from './functions.js'

/**
 * Detailed tuning for the scale generation algorithms.
 */
export interface TuningParameters {
	analogousRange: number
	complementaryRange: number

	lightTextLightness: number
	lightScaleLightness: number
	lightMaxLightnessOffset: number
	lightBackgroundLightnessShift: number

	darkTextLightness: number
	darkScaleLightness: number
	darkMaxLightnessOffet: number
	darkBackgroundLightnessShift: number

	maxSaturation: number
	nominalSaturation: number
	minNominalSaturation: number
	minNominalLightness: number

	nominalMutedSaturationShift: number
	nominalMutedLightnessShift: number

	nominalBoldLightnessShift: number
	nominalBoldSaturationShift: number

	maxBackgroundChroma: number
	lowContrastBackgroundShift: number
	offsetBackgroundLightnessShift: number

	lightestGrey: number
	darkestGrey: number

	polynomialExponent: number
}

function getDefaultTuning(
	tuning?: Partial<TuningParameters>,
): TuningParameters {
	return {
		analogousRange: 60,
		complementaryRange: 60,

		lightTextLightness: 95,
		lightScaleLightness: 70,
		lightMaxLightnessOffset: 5,
		lightBackgroundLightnessShift: 10,

		darkTextLightness: 20,
		darkScaleLightness: 70,
		darkMaxLightnessOffet: 10,
		darkBackgroundLightnessShift: 3,

		maxSaturation: 100,
		nominalSaturation: 90,
		minNominalSaturation: 10,
		minNominalLightness: 50,

		nominalMutedSaturationShift: 55,
		nominalMutedLightnessShift: 15,

		nominalBoldSaturationShift: 10,
		nominalBoldLightnessShift: 30,

		maxBackgroundChroma: 4,
		lowContrastBackgroundShift: 20,
		offsetBackgroundLightnessShift: 1,
		lightestGrey: 90,
		darkestGrey: 20,
		polynomialExponent: 1.5,
		...tuning,
	}
}

/**
 * Takes a set of core params and generates all of the scale computes required for a Schema,
 * using HSLuv color space for even perceptual qualities.
 * @param params
 * @param nominalItemCount
 * @param sequentialItemCount
 * @param light
 * @returns
 */
export function getScheme(
	params: SchemeParams,
	nominalItemCount: number,
	sequentialItemCount: number,
	light: boolean,
	tuning?: TuningParameters,
): Scheme {
	const {
		accentHue,
		accentSaturation,
		accentLightness,
		backgroundLevel,
		backgroundHueShift,
		nominalHueStep,
		greySaturation,
	} = validateParams(params)

	const {
		analogousRange,
		complementaryRange,
		maxBackgroundChroma,
		lightMaxLightnessOffset,
		darkMaxLightnessOffet,
		lightTextLightness,
		darkTextLightness,
		lightScaleLightness,
		darkScaleLightness,
		maxSaturation,
		nominalSaturation,
		lightBackgroundLightnessShift,
		darkBackgroundLightnessShift,
		nominalMutedLightnessShift,
		nominalBoldLightnessShift,
		nominalMutedSaturationShift,
		nominalBoldSaturationShift,
		minNominalSaturation,
		minNominalLightness,
		lowContrastBackgroundShift,
		offsetBackgroundLightnessShift,
		lightestGrey,
		darkestGrey,
		polynomialExponent,
	} = getDefaultTuning(tuning)

	const foregroundHsl = getForegroundHsl(
		lightTextLightness,
		darkTextLightness,
		light,
	)

	const backgroundHsl = getBackgroundHsl(
		accentHue,
		backgroundLevel,
		backgroundHueShift,
		lightMaxLightnessOffset,
		darkMaxLightnessOffet,
		maxBackgroundChroma,
		analogousRange,
		complementaryRange,
		light,
	)

	const backgroundLightness = backgroundHsl[2]

	const offsetbackgroundHsl = getOffsetBackgroundHsl(
		backgroundHsl,
		offsetBackgroundLightnessShift,
		light,
	)

	const boldGreyLightness = light ? darkestGrey : lightestGrey
	const greyLightness = getGreyLightness(
		backgroundLightness,
		lightBackgroundLightnessShift,
		darkBackgroundLightnessShift,
		light,
	)

	const greys = greySequence(
		accentHue,
		sequentialItemCount,
		greyLightness,
		boldGreyLightness,
		greySaturation,
	)

	const {
		faintAnnotationHsl,
		lowContrastAnnotationHsl,
		lowMidContrastAnnotationHsl,
		midContrastAnnotationHsl,
		midHighContrastAnnotationHsl,
		highContrastAnnotationHsl,
	} = getAnnotations(
		accentHue,
		backgroundLightness,
		boldGreyLightness,
		lowContrastBackgroundShift,
		lightestGrey,
		darkestGrey,
		greySaturation,
		light,
	)

	const scaleLightness = light ? darkScaleLightness : lightScaleLightness
	const nominalHues = getNominalHues(
		accentHue,
		nominalHueStep,
		nominalItemCount,
	)
	const nominal = getNominalSequence(
		nominalHues,
		nominalSaturation,
		minNominalSaturation,
		scaleLightness,
		minNominalLightness,
	)
	const nominalMuted = getNominalMutedSequence(
		nominalHues,
		nominalSaturation,
		minNominalSaturation,
		scaleLightness,
		minNominalLightness,
		nominalMutedSaturationShift,
		nominalMutedLightnessShift,
	)
	const nominalBold = getNominalBoldSequence(
		nominalHues,
		nominalSaturation,
		minNominalSaturation,
		scaleLightness,
		minNominalLightness,
		nominalBoldSaturationShift,
		nominalBoldLightnessShift,
	)

	const sequential1 = getSequentialSequence(
		nominalHues,
		accentLightness,
		greyLightness,
		maxSaturation,
		sequentialItemCount,
		0,
	)
	const sequential2 = getSequentialSequence(
		nominalHues,
		accentLightness,
		greyLightness,
		maxSaturation,
		sequentialItemCount,
		1,
	)

	const diverging1 = getDivergingSequence(
		nominalHues,
		accentLightness,
		greyLightness,
		maxSaturation,
		polynomialExponent,
		sequentialItemCount,
		0,
	)
	const diverging2 = getDivergingSequence(
		nominalHues,
		accentLightness,
		greyLightness,
		maxSaturation,
		polynomialExponent,
		sequentialItemCount,
		1,
	)
	return {
		background: hsluv2hex(backgroundHsl),
		offsetBackground: hsluv2hex(offsetbackgroundHsl),
		foreground: hsluv2hex(foregroundHsl),
		accent: hsluv2hex([accentHue, accentSaturation, accentLightness]),
		lowContrastAnnotation: hsluv2hex(lowContrastAnnotationHsl),
		lowMidContrastAnnotation: hsluv2hex(lowMidContrastAnnotationHsl),
		midContrastAnnotation: hsluv2hex(midContrastAnnotationHsl),
		midHighContrastAnnotation: hsluv2hex(midHighContrastAnnotationHsl),
		highContrastAnnotation: hsluv2hex(highContrastAnnotationHsl),
		faintAnnotation: hsluv2hex(faintAnnotationHsl),
		sequential: hsluvList2hexList(sequential1),
		sequential2: hsluvList2hexList(sequential2),
		diverging: hsluvList2hexList(diverging1),
		diverging2: hsluvList2hexList(diverging2),
		nominalBold: hsluvList2hexList(nominalBold),
		nominal: hsluvList2hexList(nominal),
		nominalMuted: hsluvList2hexList(nominalMuted),
		greys: hsluvList2hexList(greys),
		warning: '#ff8c00',
		error: '#d13438',
	}
}

/**
 * Transforms a list of HSLuv vectors to hex strings.
 * @param values
 * @returns
 */
function hsluvList2hexList(hsluvs: HslVector[]): string[] {
	return hsluvs.map(hsluv2hex)
}

/**
 * Validates the param limits, and returns a clean set or throws if unadjustable.
 * @param params
 */
export function validateParams(params: SchemeParams): Required<SchemeParams> {
	const {
		accentHue,
		accentSaturation,
		accentLightness,
		backgroundLevel,
		backgroundHueShift,
		nominalHueStep,
		greySaturation,
	} = params

	const hueShift = backgroundHueShift || defaultParams.backgroundHueShift
	const level = backgroundLevel || defaultParams.backgroundLevel
	const step = nominalHueStep || defaultParams.nominalHueStep
	const greySat = greySaturation || defaultParams.greySaturation

	if (!accentHue) {
		throw new Error(
			'Must supply an accent hue from 0-360. <undefined> was supplied.',
		)
	}

	if (!accentLightness) {
		throw new Error(
			'Must supply an accent lightness from 0-100. <undefined> was supplied.',
		)
	}

	if (!accentSaturation) {
		throw new Error(
			'Must supply an accent saturation from 0-100. <undefined> was supplied.',
		)
	}

	if (accentLightness < 0 || accentLightness > 100) {
		throw new Error(
			`accentLightness ${accentLightness} is out of valid range: 0-100`,
		)
	}

	if (accentSaturation < 0 || accentSaturation > 100) {
		throw new Error(
			`accentSaturation ${accentSaturation} is out of valid range: 0-100`,
		)
	}

	if (level < 0 || level > 100) {
		throw new Error(`backgroundLevel ${level} is out of valid range: 0-100`)
	}

	if (hueShift < 0 || hueShift > 100) {
		throw new Error(
			`backgroundHueShift ${hueShift} is out of valid range: 0-100`,
		)
	}

	if (greySat < 0 || greySat > 100) {
		throw new Error(`greySaturation ${greySat} is out of valid range: 0-100`)
	}

	const hueMod = accentHue % 360

	return {
		accentHue: hueMod > 0 ? hueMod : accentHue,
		accentLightness,
		accentSaturation,
		backgroundHueShift: hueShift,
		backgroundLevel: level,
		nominalHueStep: step,
		greySaturation: greySat,
	}
}
