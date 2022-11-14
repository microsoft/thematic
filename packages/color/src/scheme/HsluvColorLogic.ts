/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { hsluv2hex } from '../chroma.js'
import type { Params, Scheme } from '../types'
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
	hsluvList2HexList,
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
		MAX_LIGHT_LUMINANCE_OFFSET,
		MAX_DARK_LUMINANCE_OFFSET,
		MAX_BACKGROUND_CHROMA,
		ANALOGOUS_RANGE,
		COMPLEMENTARY_RANGE,
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
		MIN_NOMINAL_SATURATION,
		scaleLuminance,
		MIN_NOMINAL_LUMINANCE,
	)
	const nominalMuted = getNominalMutedSequence(
		nominalHues,
		NOMINAL_SATURATION,
		MIN_NOMINAL_SATURATION,
		scaleLuminance,
		MIN_NOMINAL_LUMINANCE,
		MUTED_SATURATION_SHIFT,
		NOMINAL_LIGHTER_SHIFT,
	)
	const nominalBold = getNominalBoldSequence(
		nominalHues,
		NOMINAL_SATURATION,
		MIN_NOMINAL_SATURATION,
		scaleLuminance,
		MIN_NOMINAL_LUMINANCE,
		BOLD_SATURATION_SHIFT,
		NOMINAL_DARKER_SHIFT,
	)

	const sequential1 = getSequentialSequence(
		nominalHues,
		accentLuminance,
		greyLuminance,
		MAX_SATURATION,
		sequentialItemCount,
		0,
	)
	const sequential2 = getSequentialSequence(
		nominalHues,
		accentLuminance,
		greyLuminance,
		MAX_SATURATION,
		sequentialItemCount,
		1,
	)

	const diverging1 = getDivergingSequence(
		nominalHues,
		accentLuminance,
		greyLuminance,
		MAX_SATURATION,
		POLYNOMIAL_EXPONENT,
		sequentialItemCount,
		0,
	)
	const diverging2 = getDivergingSequence(
		nominalHues,
		accentLuminance,
		greyLuminance,
		MAX_SATURATION,
		POLYNOMIAL_EXPONENT,
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
