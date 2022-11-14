/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { hsluv2hex } from '../chroma.js'
import type { HslVector, Scheme, SchemeParams } from '../types'
import {
	getAnnotations,
	getBackgroundHsl,
	getDivergingSequence,
	getForegroundHsl,
	getNominalBoldSequence,
	getNominalHues,
	getNominalMutedSequence,
	getNominalSequence,
	getOffsetBackgroundHsl,
	getSequentialSequence,
	greySequence,
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

// TODO: this should probably throw errors if out-of-bounds values are submitted OR, wrap around the geometry if that's always valid
export function getScheme(
	params: SchemeParams,
	nominalItemCount: number,
	sequentialItemCount: number,
	light: boolean,
): Scheme {
	const {
		accentHue,
		accentSaturation,
		accentLightness,
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
		MAX_LIGHT_LUMINANCE_OFFSET,
		MAX_DARK_LUMINANCE_OFFSET,
		MAX_BACKGROUND_CHROMA,
		ANALOGOUS_RANGE,
		COMPLEMENTARY_RANGE,
		light,
	)

	const [, , backgroundLightness] = backgroundHsl

	const offsetbackgroundHsl = getOffsetBackgroundHsl(
		light,
		backgroundHsl,
		OFFSET_BACKGROUND_LUMINANCE_SHIFT,
	)

	const boldGreyLightness = light ? DARKEST_GREY : LIGHTEST_GREY
	const greyLightness = light
		? backgroundLightness - DARK_SCALE_BACKGROUND_LUMINANCE_SHIFT
		: backgroundLightness + LIGHT_SCALE_BACKGROUND_LUMINANCE_SHIFT

	const greys = greySequence(
		accentHue,
		sequentialItemCount,
		greyLightness,
		boldGreyLightness,
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
		LOW_CONTRAST_BACKGROUND_SHIFT,
		LIGHTEST_GREY,
		DARKEST_GREY,
		light,
	)

	const scaleLightness = light ? DARK_SCALE_LUMINANCE : LIGHT_SCALE_LUMINANCE
	const nominalHues = getNominalHues(
		accentHue,
		nominalHueStep,
		nominalItemCount,
	)
	const nominal = getNominalSequence(
		nominalHues,
		NOMINAL_SATURATION,
		MIN_NOMINAL_SATURATION,
		scaleLightness,
		MIN_NOMINAL_LUMINANCE,
	)
	const nominalMuted = getNominalMutedSequence(
		nominalHues,
		NOMINAL_SATURATION,
		MIN_NOMINAL_SATURATION,
		scaleLightness,
		MIN_NOMINAL_LUMINANCE,
		MUTED_SATURATION_SHIFT,
		NOMINAL_LIGHTER_SHIFT,
	)
	const nominalBold = getNominalBoldSequence(
		nominalHues,
		NOMINAL_SATURATION,
		MIN_NOMINAL_SATURATION,
		scaleLightness,
		MIN_NOMINAL_LUMINANCE,
		BOLD_SATURATION_SHIFT,
		NOMINAL_DARKER_SHIFT,
	)

	const sequential1 = getSequentialSequence(
		nominalHues,
		accentLightness,
		greyLightness,
		MAX_SATURATION,
		sequentialItemCount,
		0,
	)
	const sequential2 = getSequentialSequence(
		nominalHues,
		accentLightness,
		greyLightness,
		MAX_SATURATION,
		sequentialItemCount,
		1,
	)

	const diverging1 = getDivergingSequence(
		nominalHues,
		accentLightness,
		greyLightness,
		MAX_SATURATION,
		POLYNOMIAL_EXPONENT,
		sequentialItemCount,
		0,
	)
	const diverging2 = getDivergingSequence(
		nominalHues,
		accentLightness,
		greyLightness,
		MAX_SATURATION,
		POLYNOMIAL_EXPONENT,
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
