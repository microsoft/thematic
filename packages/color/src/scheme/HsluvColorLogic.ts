/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { hsluv2hex } from '../chroma.js'
import type { HslVector, Params, Scheme } from '../types'
import {
	getBackgroundLuminance,
	getBackgroundSaturation,
	getOffsetHue,
	greySequence,
	hsluvList2HexList,
	polynomialHslSequence,
} from './functions.js'

/**
 * This section is a set of tuning constants for the color scheme generation.
 * Each one should be parameterized in the functions, but this provides a top-level
 * look at the defaults we use.
 */
const ANALOGOUS_RANGE = 60
const COMPLEMENTARY_RANGE = 60
const MAX_BACKGROUND_CHROMA = 4 // absolute

const MAX_LIGHT_LUMINANCE_OFFSET = 5
const MAX_DARK_LUMINANCE_OFFSET = 10

const LIGHT_TEXT_LUMINANCE = 95
const DARK_TEXT_LUMINANCE = 20
const LIGHT_SCALE_LUMINANCE = 70
const DARK_SCALE_LUMINANCE = 70
const MAX_SATURATION = 100

const LIGHT_SCALE_BACKGROUND_LUMINANCE_SHIFT = 10
const DARK_SCALE_BACKGROUND_LUMINANCE_SHIFT = 3

const NOMINAL_SATURATION = 90
const NOMINAL_LIGHTER_SHIFT = 15
const NOMINAL_DARKER_SHIFT = 30
const BOLD_SATURATION_SHIFT = 10
const MUTED_SATURATION_SHIFT = 55
const MIN_NOMINAL_SATURATION = 10
const MIN_NOMINAL_LUMINANCE = 50
const POLYNOMIAL_EXPONENT = 1.5
const LOW_CONTRAST_BACKGROUND_SHIFT = 20
const DARKEST_GREY = 20
const LIGHTEST_GREY = 90
const OFFSET_BACKGROUND_LUMINANCE_SHIFT = 1

function getBackgroundHsl(
	hue: number,
	backgroundLevel: number,
	backgroundHueShift: number,
	light: boolean,
): HslVector {
	const h = getOffsetHue(
		hue,
		backgroundHueShift,
		ANALOGOUS_RANGE,
		COMPLEMENTARY_RANGE,
	)
	const l = getBackgroundLuminance(
		backgroundLevel,
		MAX_LIGHT_LUMINANCE_OFFSET,
		MAX_DARK_LUMINANCE_OFFSET,
		light,
	)
	const s = getBackgroundSaturation(
		h,
		l,
		backgroundLevel,
		MAX_BACKGROUND_CHROMA,
	)
	return [h, s, l]
}

/**
 * For a given set of nominal hues, find the accents and complement set.
 * Accent is established by configuring an offset within the hues array,
 * complement is 90deg from that in the hue space.
 * @param hues
 * @param accentHsl
 * @param greyLuminance
 * @param offset
 * @returns
 */
function getAccentsAndComplements(
	hues: number[],
	colorLuminance: number,
	greyLuminance: number,
	maxSaturation: number,
	offset: number,
): {
	greyAccent: HslVector
	greyComplement: HslVector
	maxSaturationAccent: HslVector
	maxSaturationComplement: HslVector
} {
	const accentHue = hues[offset % hues.length] as number
	const complementHue = (accentHue + 90) % 360
	const greyAccent: HslVector = [accentHue, 0, greyLuminance]
	const greyComplement: HslVector = [complementHue, 0, greyLuminance]
	const maxSaturationAccent: HslVector = [
		accentHue,
		maxSaturation,
		colorLuminance,
	]
	const maxSaturationComplement: HslVector = [
		complementHue,
		maxSaturation,
		colorLuminance,
	]

	return {
		greyAccent,
		greyComplement,
		maxSaturationAccent,
		maxSaturationComplement,
	}
}

/**
 * Returns a sequence of hue components using the specified step starting from an initial hue.
 * Attempts to cycle in a way that is predictable but does not result in similar neighbor colors.
 * @param accentHsl
 * @param nominalHueStep
 * @param size
 * @returns
 */
function getNominalHues(start: number, step: number, size: number) {
	const initialHues = step <= 10 ? 13 - step : step - 8
	const hueDirection = step <= 10 ? -1 : 1

	let hues: number[] = []
	let hueStep = 360.0 / initialHues

	for (let i = 0; i < initialHues; i += 1) {
		hues.push((start + i * hueDirection * hueStep) % 360)
	}

	while (hues.length < size) {
		hueStep = hueStep / 2
		const newHues: number[] = []
		for (const existingHue of hues) {
			newHues.push((existingHue + hueDirection * hueStep) % 360)
			if (hues.length + newHues.length === size) {
				break
			}
		}
		hues = hues.concat(newHues)
	}

	// trim the core hues to match requested size
	// this acounts for initialHues calculation
	// which can result in minimum counts higher than requested
	return hues.slice(0, size)
}

function getNominalSequence(
	nominalHues: number[],
	nominalSaturation: number,
	scaleLuminance: number,
) {
	let baseSaturation = nominalSaturation
	let baseLuminance = scaleLuminance

	return nominalHues.map((hue, idx) => {
		const hsl = [hue, baseSaturation, baseLuminance] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, MIN_NOMINAL_SATURATION)
		}
		if ((idx + 1) % 6 === 0) {
			baseLuminance = Math.max(baseLuminance - 1, MIN_NOMINAL_LUMINANCE)
		}
		return hsl
	})
}

function getNominalMutedSequence(
	nominalHues: number[],
	scaleLuminance: number,
) {
	const nominalSaturation = NOMINAL_SATURATION
	let baseSaturation = NOMINAL_SATURATION
	let baseLuminance = scaleLuminance

	return nominalHues.map((hue, idx) => {
		const hsl = [
			hue,
			0.5 * (nominalSaturation + baseSaturation) - MUTED_SATURATION_SHIFT,
			0.5 * (scaleLuminance + baseLuminance) + NOMINAL_LIGHTER_SHIFT,
		] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, MIN_NOMINAL_SATURATION)
		}
		if ((idx + 1) % 6 === 0) {
			baseLuminance = Math.max(baseLuminance - 1, MIN_NOMINAL_LUMINANCE)
		}
		return hsl
	})
}

function getNominalBoldSequence(nominalHues: number[], scaleLuminance: number) {
	const nominalSaturation = NOMINAL_SATURATION
	let baseSaturation = NOMINAL_SATURATION
	let baseLuminance = scaleLuminance

	return nominalHues.map((hue, idx) => {
		const hsl = [
			hue,
			0.5 * (nominalSaturation + baseSaturation) + BOLD_SATURATION_SHIFT,
			0.5 * (scaleLuminance + baseLuminance) - NOMINAL_DARKER_SHIFT,
		] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, MIN_NOMINAL_SATURATION)
		}
		if ((idx + 1) % 6 === 0) {
			baseLuminance = Math.max(baseLuminance - 1, MIN_NOMINAL_LUMINANCE)
		}
		return hsl
	})
}

function getSequentialSequence(
	nominalHues: number[],
	colorLuminance: number,
	greyLuminance: number,
	size: number,
	offset: number,
) {
	const { greyAccent, maxSaturationAccent } = getAccentsAndComplements(
		nominalHues,
		colorLuminance,
		greyLuminance,
		MAX_SATURATION,
		offset,
	)
	return polynomialHslSequence(greyAccent, maxSaturationAccent, size)
}

function getDivergingSequence(
	nominalHues: number[],
	colorLuminance: number,
	greyLuminance: number,
	size: number,
	offset: number,
) {
	const {
		greyAccent,
		greyComplement,
		maxSaturationAccent,
		maxSaturationComplement,
	} = getAccentsAndComplements(
		nominalHues,
		colorLuminance,
		greyLuminance,
		MAX_SATURATION,
		offset,
	)

	const half = Math.round(size / 2)
	const cut = size % 2 === 0 ? half + 1 : half

	const diverging = polynomialHslSequence(
		greyComplement,
		maxSaturationComplement,
		cut,
		POLYNOMIAL_EXPONENT,
	)
		.slice(1)
		.reverse()

	let toAdd = polynomialHslSequence(
		greyAccent,
		maxSaturationAccent,
		cut,
		POLYNOMIAL_EXPONENT,
	)
	if (size % 2 === 0) {
		toAdd = toAdd.slice(1, cut)
	}
	return diverging.concat(toAdd)
}

function getAnnotations(
	accentHue: number,
	backgroundLuminance: number,
	boldGreyLuminance: number,
	lowContrastbackgroundShift: number,
	lightestGrey: number,
	darkestGrey: number,
	light: boolean,
) {
	const mutedGreyLuminance = light
		? backgroundLuminance - lowContrastbackgroundShift
		: backgroundLuminance + lowContrastbackgroundShift

	const annotations = greySequence(
		accentHue,
		5,
		mutedGreyLuminance,
		boldGreyLuminance,
	)
	const lowContrastAnnotationHsl = annotations[0] as HslVector
	const lowMidContrastAnnotationHsl = annotations[1] as HslVector
	const midContrastAnnotationHsl = annotations[2] as HslVector
	const midHighContrastAnnotationHsl = annotations[3] as HslVector
	const highContrastAnnotationHsl = annotations[4] as HslVector
	// halfway to the background from the darkest/lightest
	const faintLuminance = light
		? (100 - lightestGrey) / 2 + lightestGrey
		: darkestGrey / 2
	const faintAnnotationHsl: HslVector = [accentHue, 0, faintLuminance]

	return {
		faintAnnotationHsl,
		lowContrastAnnotationHsl,
		lowMidContrastAnnotationHsl,
		midContrastAnnotationHsl,
		midHighContrastAnnotationHsl,
		highContrastAnnotationHsl,
	}
}

function getForegroundHsl(
	light: boolean,
	darkTextLuminance: number,
	lightTextLuminance: number,
): HslVector {
	const textLuminance = light ? darkTextLuminance : lightTextLuminance
	return [0, 0, textLuminance]
}

function getOffsetBackgroundHsl(
	light: boolean,
	backgroundHsl: HslVector,
	offsetBackgroundLuminanceShift: number,
): HslVector {
	const [backgroundHue, backgroundSaturation, backgroundLuminance] =
		backgroundHsl
	const offsetBackgroundLuminance = light
		? Math.min(100, backgroundLuminance + offsetBackgroundLuminanceShift)
		: Math.max(0, backgroundLuminance - offsetBackgroundLuminanceShift)

	return [backgroundHue, backgroundSaturation, offsetBackgroundLuminance]
}

// TODO: this should probably throw errors if out-of-bounds values are submitted OR, wrap around the geometry if that's always valid
export function getScheme(
	params: Params,
	nominalItemCount: number,
	sequentialItemCount: number,
	light: boolean,
): Scheme {
	const {
		accentHue,
		accentSaturation,
		accentLuminance,
		backgroundLevel,
		backgroundHueShift,
		nominalHueStep,
	} = params

	const foregroundHsl = getForegroundHsl(
		light,
		DARK_TEXT_LUMINANCE,
		LIGHT_TEXT_LUMINANCE,
	)

	const backgroundHsl = getBackgroundHsl(
		accentHue,
		backgroundLevel,
		backgroundHueShift,
		light,
	)

	const [, , backgroundLuminance] = backgroundHsl

	const offsetbackgroundHsl = getOffsetBackgroundHsl(
		light,
		backgroundHsl,
		OFFSET_BACKGROUND_LUMINANCE_SHIFT,
	)

	const boldGreyLuminance = light ? DARKEST_GREY : LIGHTEST_GREY
	const greyLuminance = light
		? backgroundLuminance - DARK_SCALE_BACKGROUND_LUMINANCE_SHIFT
		: backgroundLuminance + LIGHT_SCALE_BACKGROUND_LUMINANCE_SHIFT

	const greys = greySequence(
		accentHue,
		sequentialItemCount,
		greyLuminance,
		boldGreyLuminance,
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
		backgroundLuminance,
		boldGreyLuminance,
		LOW_CONTRAST_BACKGROUND_SHIFT,
		LIGHTEST_GREY,
		DARKEST_GREY,
		light,
	)

	const scaleLuminance = light ? DARK_SCALE_LUMINANCE : LIGHT_SCALE_LUMINANCE
	const nominalHues = getNominalHues(
		accentHue,
		nominalHueStep,
		nominalItemCount,
	)
	const nominal = getNominalSequence(
		nominalHues,
		NOMINAL_SATURATION,
		scaleLuminance,
	)
	const nominalMuted = getNominalMutedSequence(nominalHues, scaleLuminance)
	const nominalBold = getNominalBoldSequence(nominalHues, scaleLuminance)

	const sequential1 = getSequentialSequence(
		nominalHues,
		accentLuminance,
		greyLuminance,
		sequentialItemCount,
		0,
	)
	const sequential2 = getSequentialSequence(
		nominalHues,
		accentLuminance,
		greyLuminance,
		sequentialItemCount,
		1,
	)

	const diverging1 = getDivergingSequence(
		nominalHues,
		accentLuminance,
		greyLuminance,
		sequentialItemCount,
		0,
	)
	const diverging2 = getDivergingSequence(
		nominalHues,
		accentLuminance,
		greyLuminance,
		sequentialItemCount,
		1,
	)
	return {
		background: hsluv2hex(...backgroundHsl),
		offsetBackground: hsluv2hex(...offsetbackgroundHsl),
		foreground: hsluv2hex(...foregroundHsl),
		accent: hsluv2hex(accentHue, accentSaturation, accentLuminance),
		lowContrastAnnotation: hsluv2hex(...lowContrastAnnotationHsl),
		lowMidContrastAnnotation: hsluv2hex(...lowMidContrastAnnotationHsl),
		midContrastAnnotation: hsluv2hex(...midContrastAnnotationHsl),
		midHighContrastAnnotation: hsluv2hex(...midHighContrastAnnotationHsl),
		highContrastAnnotation: hsluv2hex(...highContrastAnnotationHsl),
		faintAnnotation: hsluv2hex(...faintAnnotationHsl),
		sequential: hsluvList2HexList(sequential1),
		sequential2: hsluvList2HexList(sequential2),
		diverging: hsluvList2HexList(diverging1),
		diverging2: hsluvList2HexList(diverging2),
		nominalBold: hsluvList2HexList(nominalBold),
		nominal: hsluvList2HexList(nominal),
		nominalMuted: hsluvList2HexList(nominalMuted),
		greys: hsluvList2HexList(greys),
		warning: '#ff8c00',
		error: '#d13438',
	}
}
