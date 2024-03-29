/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { hsluv2hsl } from '../chroma.js'
import type { HslVector } from '../types.js'
import { polynomialHslSequence } from './utils.js'

/**
 * Gets an offset hue based on the hue shift param.
 * This is used to tint the background color slightly.
 * Note that the shift parameter is arbitrarily binned using the 0-100 range:
 * 0-25 counterclockwise complementary, 25-75 analogous, 75+ clockwise complementary.
 * @param hue
 * @param shift
 * @param analagousRange
 * @param complementaryRange
 * @returns
 */
function getOffsetHue(
	hue: number,
	shift: number,
	analogousRange: number,
	complementaryRange: number,
) {
	if (shift >= 25 && shift <= 75) {
		//  analogous range
		const delta = (analogousRange * (shift - 50)) / 25
		return (hue + delta) % 360
	} else if (shift > 75) {
		// clockwise complementary range
		const delta = 180 - (complementaryRange * (100 - shift)) / 25
		return (hue + delta) % 360
	} else {
		// anticlockwise complementary range
		const delta = 180 + (complementaryRange * shift) / 25
		return (hue + delta) % 360
	}
}

/**
 * Choose a background lightness based on the "level" and light/dark mode.
 * @param level
 * @param lightMaxOffset
 * @param darkMaxOffset
 * @param light
 * @returns
 */
function getBackgroundLightness(
	level: number,
	lightMaxOffset: number,
	darkMaxOffset: number,
	light: boolean,
) {
	if (light) {
		if (level < 50) {
			return 100 - lightMaxOffset
		}
		return 100 - lightMaxOffset * (1 - (level - 50) / 50)
	} else {
		if (level < 50) {
			return darkMaxOffset
		} else {
			return darkMaxOffset * (1 - (level - 50) / 50)
		}
	}
}

/**
 * Find a saturation value that maximizes chroma for a given hue.
 * HSLuv has relative saturation, so we find this using HSL and map it back.
 * @param hue
 * @param lightness
 * @param maxBackgroundChroma
 * @returns
 */
function normalizeSaturation(
	hue: number,
	lightness: number,
	maxChroma: number,
) {
	let satGivingMaxChroma = 100
	let c = hsluv2hsl([hue, 100, lightness])[1]
	while (c > maxChroma && satGivingMaxChroma >= 0) {
		satGivingMaxChroma -= 1
		c = hsluv2hsl([hue, satGivingMaxChroma, lightness])[1]
	}
	return satGivingMaxChroma
}

/**
 * Finds the ideal saturation for a given background config.
 * @param hue
 * @param lightness
 * @param level
 * @param maxChroma
 * @returns
 */
function getBackgroundSaturation(
	hue: number,
	lightness: number,
	level: number,
	maxChroma: number,
): number {
	if (level < 50) {
		return (level * normalizeSaturation(hue, lightness, maxChroma)) / 50
	} else {
		return normalizeSaturation(hue, lightness, maxChroma)
	}
}

/**
 * Gets the background HSL color based on our hue params and shifts.
 * @param hue
 * @param level
 * @param shift
 * @param lightMaxLightnessOffset
 * @param darkMaxLightnessOffet
 * @param maxChroma
 * @param analogousRange
 * @param complementaryRange
 * @param light
 * @returns
 */
export function getBackgroundHsl(
	hue: number,
	level: number,
	shift: number,
	lightMaxLightnessOffset: number,
	darkMaxLightnessOffet: number,
	maxChroma: number,
	analogousRange: number,
	complementaryRange: number,
	light: boolean,
): HslVector {
	const h = getOffsetHue(hue, shift, analogousRange, complementaryRange)
	const l = getBackgroundLightness(
		level,
		lightMaxLightnessOffset,
		darkMaxLightnessOffet,
		light,
	)
	const s = getBackgroundSaturation(h, l, level, maxChroma)
	return [h, s, l]
}

/**
 * For a given set of nominal hues, find the accents and complement set.
 * Accent is established by configuring an offset within the hues array,
 * complement is 90deg from that in the hue space.
 * @param hues
 * @param accentHsl
 * @param greyLightness
 * @param offset
 * @returns
 */
export function getAccentsAndComplements(
	hues: number[],
	saturation: number,
	lightness: number,
	greyLightness: number,
	offset: number,
): {
	greyAccent: HslVector
	greyComplement: HslVector
	accent: HslVector
	complement: HslVector
} {
	const accentHue = hues[offset % hues.length] as number
	const complementHue = (accentHue + 90) % 360
	const greyAccent: HslVector = [accentHue, 0, greyLightness]
	const greyComplement: HslVector = [complementHue, 0, greyLightness]
	const accent: HslVector = [accentHue, saturation, lightness]
	const complement: HslVector = [complementHue, saturation, lightness]

	return {
		greyAccent,
		greyComplement,
		accent,
		complement,
	}
}

/**
 * Returns a sequence of hue components using the specified step starting from an initial hue.
 * Attempts to cycle in a way that is predictable but does not result in similar neighbor colors.
 * Note that there is a standard cycle for the most common 10 hue scales, and then it randomizes more.
 * @param start
 * @param step
 * @param size
 * @returns
 */
export function getNominalHues(start: number, step: number, size: number) {
	const initialHues = step <= 11 ? 13 - step : step - 8
	const hueDirection = step <= 11 ? -1 : 1

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
	// this accounts for initialHues calculation
	// which can result in minimum counts higher than requested
	return hues.slice(0, size)
}

/**
 * Gets a nominal sequence with even perception based on a core hue set.
 * In order to maintain some differentiation, at greater quantities
 * the colors are shifted in saturation and lightness.
 * @param hues
 * @param saturation
 * @param minSaturation
 * @param lightness
 * @param minLightness
 * @returns
 */
export function getNominalSequence(
	hues: number[],
	saturation: number,
	minSaturation: number,
	lightness: number,
	minLightness: number,
): HslVector[] {
	const minS = Math.min(saturation, minSaturation)
	const minL = Math.min(lightness, minLightness)
	let baseSaturation = saturation
	let baseLightness = lightness
	return hues.map((hue, idx) => {
		const hsl = [hue, baseSaturation, baseLightness] as HslVector
		if (idx > 9 && (idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, minS)
		}
		if (idx > 9 && (idx + 1) % 6 === 0) {
			baseLightness = Math.max(baseLightness - 1, minL)
		}
		return hsl
	})
}

/**
 * Gets the muted/bold nominal sequence by shifting the saturation and lightness
 * @param hues
 * @param saturation
 * @param minSaturation
 * @param lightness
 * @param minLightness
 * @param saturationShift
 * @param nominalShift
 * @returns
 */
export function getNominalShiftedSequence(
	hues: number[],
	saturation: number,
	minSaturation: number,
	lightness: number,
	minLightness: number,
	saturationShift: number,
	lightnessShift: number,
) {
	let baseSaturation = saturation
	let baseLightness = lightness

	return hues.map((hue, idx) => {
		const shiftedS = 0.5 * (saturation + baseSaturation) + saturationShift
		const shiftedL = 0.5 * (lightness + baseLightness) + lightnessShift
		// correct for valid bounds
		const correctedS = Math.min(Math.max(0, shiftedS), 100)
		const correctedL = Math.min(Math.max(0, shiftedL), 100)
		const hsl = [hue, correctedS, correctedL] as HslVector
		if (idx > 9 && (idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, minSaturation)
		}
		if (idx > 9 && (idx + 1) % 6 === 0) {
			baseLightness = Math.max(baseLightness - 1, minLightness)
		}
		return hsl
	})
}

/**
 * Just gets every hue, with consistent saturation and lightness.
 * @param start
 * @param saturation
 * @param lightness
 * @returns
 */
export function getNominalRainbowSequence(
	start: number,
	saturation: number,
	lightness: number,
) {
	return new Array(360)
		.fill(1)
		.map((_a, i) => [i + start, saturation, lightness] as HslVector)
}

/**
 * Creates a sequence of greys from a {start} to {end} lightness.
 * Note the optional saturation - by default this is 0 for pure greys,
 * but if you want some of the hue mixed in to warm or cool the sequence
 * you can bump this and the hue will emerge.
 * @param hue
 * @param size
 * @param startLightness
 * @param endLightness
 * @param saturation
 * @returns
 */
export function greySequence(
	hue: number,
	saturation: number,
	startLightness: number,
	endLightness: number,
	size: number,
) {
	const greyFrom: HslVector = [hue, saturation, startLightness]
	const greyTo: HslVector = [hue, saturation, endLightness]
	return polynomialHslSequence(greyFrom, greyTo, size)
}

/**
 * Gets the sequential scale sequence from grey to the offset hue color.
 * @param hues
 * @param saturation
 * @param lightness
 * @param greyLightness
 * @param size
 * @param offset
 * @returns
 */
export function getSequentialSequence(
	hues: number[],
	saturation: number,
	lightness: number,
	greyLightness: number,
	size: number,
	offset: number,
) {
	const { greyAccent, accent } = getAccentsAndComplements(
		hues,
		saturation,
		lightness,
		greyLightness,
		offset,
	)
	return polynomialHslSequence(greyAccent, accent, size)
}

/**
 * Gets the diverging scale sequence from a complement on one end to the offset hue on the other, with near-white in the middle.
 * @param hues
 * @param saturation
 * @param lightness
 * @param greyLightness
 * @param polynomialExponent
 * @param size
 * @param offset
 * @returns
 */
export function getDivergingSequence(
	hues: number[],
	saturation: number,
	lightness: number,
	greyLightness: number,
	polynomialExponent: number,
	size: number,
	offset: number,
) {
	const { greyAccent, greyComplement, accent, complement } =
		getAccentsAndComplements(hues, saturation, lightness, greyLightness, offset)

	const half = Math.round(size / 2)
	const cut = size % 2 === 0 ? half + 1 : half

	const diverging = polynomialHslSequence(
		greyComplement,
		complement,
		cut,
		polynomialExponent,
	)
		.slice(1)
		.reverse()

	let toAdd = polynomialHslSequence(greyAccent, accent, cut, polynomialExponent)
	if (size % 2 === 0) {
		toAdd = toAdd.slice(1, cut)
	}
	return diverging.concat(toAdd)
}

/**
 * Gets the collection of greyscale annotations for text colors.
 * @param accentHue
 * @param backgroundLightness
 * @param boldGreyLightness
 * @param lowContrastbackgroundShift
 * @param lightestGrey
 * @param darkestGrey
 * @param greySaturation
 * @param light
 * @returns
 */
export function getAnnotations(
	accentHue: number,
	backgroundLightness: number,
	boldGreyLightness: number,
	lowContrastbackgroundShift: number,
	lightestGrey: number,
	darkestGrey: number,
	greySaturation: number,
	light: boolean,
) {
	const mutedGreyLightness = light
		? backgroundLightness - lowContrastbackgroundShift
		: backgroundLightness + lowContrastbackgroundShift

	const annotations = greySequence(
		accentHue,
		greySaturation,
		mutedGreyLightness,
		boldGreyLightness,
		5,
	)
	const lowContrastAnnotationHsl = annotations[0] as HslVector
	const lowMidContrastAnnotationHsl = annotations[1] as HslVector
	const midContrastAnnotationHsl = annotations[2] as HslVector
	const midHighContrastAnnotationHsl = annotations[3] as HslVector
	const highContrastAnnotationHsl = annotations[4] as HslVector
	// halfway to the background from the darkest/lightest
	const faintLightness = light
		? (100 - lightestGrey) / 2 + lightestGrey
		: darkestGrey / 2
	const faintAnnotationHsl: HslVector = [accentHue, 0, faintLightness]

	return {
		faintAnnotationHsl,
		lowContrastAnnotationHsl,
		lowMidContrastAnnotationHsl,
		midContrastAnnotationHsl,
		midHighContrastAnnotationHsl,
		highContrastAnnotationHsl,
	}
}

/**
 * Gets the primary foreground (text) color.
 * @param lightTextLightness
 * @param darkTextLightness
 * @param light
 * @returns
 */
export function getForegroundHsl(
	lightTextLightness: number,
	darkTextLightness: number,
	light: boolean,
): HslVector {
	const textLightness = light ? darkTextLightness : lightTextLightness
	return [0, 0, textLightness]
}
/**
 * Gets the offset background - this is used for data plot area for example,
 * so it stands out slightly from the regular application background.
 * @param backgroundHsl
 * @param lightnessShift
 * @param light
 * @returns
 */

export function getOffsetBackgroundHsl(
	backgroundHsl: HslVector,
	lightnessShift: number,
	light: boolean,
): HslVector {
	const [hue, saturation, lightness] = backgroundHsl
	const offsetLightness = light
		? Math.min(100, lightness + lightnessShift)
		: Math.max(0, lightness - lightnessShift)

	return [hue, saturation, offsetLightness]
}

export function getGreyLightness(
	backgroundLightness: number,
	lightBackgroundLightnessShift: number,
	darkBackgroundLightnessShift: number,
	light: boolean,
) {
	return light
		? backgroundLightness - darkBackgroundLightnessShift
		: backgroundLightness + lightBackgroundLightnessShift
}
