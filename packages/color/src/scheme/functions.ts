/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { hsluv2hsl } from '../chroma.js'
import type { HslVector } from '../types.js'
import { polynomialHslSequence } from './utils.js'

/**
 * Creates a sequence of greys from a {start} to {end} lightness.
 * Note the optional saturation - by default this is 0 for pure greys,
 * but if you want some of the hue mixed in to warm or cool the sequence
 * you can bump this.
 * @param hue
 * @param size
 * @param startLightness
 * @param endLightness
 * @param saturation
 * @returns
 */
export function greySequence(
	hue: number,
	size: number,
	startLightness: number,
	endLightness: number,
	saturation = 0,
) {
	const greyFrom: HslVector = [hue, saturation, startLightness]
	const greyTo: HslVector = [hue, saturation, endLightness]
	return polynomialHslSequence(greyFrom, greyTo, size)
}

/**
 * Gets an offset hue based on the hue shift param.
 * This is used to tint the background color slightly.
 * Note that the shift parameter is arbitrarily binned using the 0-100 range:
 * 0-25 counterclockwise complementary, 25-75 analogous, 75+ clockwise complementary.
 * @param hue
 * @param hueShift
 * @param analagousRange
 * @param complementaryRange
 * @returns
 */
export function getOffsetHue(
	hue: number,
	hueShift: number,
	analogousRange: number,
	complementaryRange: number,
) {
	if (hueShift >= 25 && hueShift <= 75) {
		//  analogous range
		const delta = (analogousRange * (hueShift - 50)) / 25
		return (hue + delta) % 360
	} else if (hueShift > 75) {
		// clockwise complementary range
		const delta = 180 - (complementaryRange * (100 - hueShift)) / 25
		return (hue + delta) % 360
	} else {
		// anticlockwise complementary range
		const delta = 180 + (complementaryRange * hueShift) / 25
		return (hue + delta) % 360
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
export function normalizeSaturation(
	hue: number,
	lightness: number,
	maxBackgroundChroma: number,
) {
	let satGivingMaxChroma = 100
	let c = hsluv2hsl([hue, 100, lightness])[1]
	while (c > maxBackgroundChroma && satGivingMaxChroma >= 0) {
		satGivingMaxChroma -= 1
		c = hsluv2hsl([hue, satGivingMaxChroma, lightness])[1]
	}
	return satGivingMaxChroma
}

export function getBackgroundLightness(
	backgroundLevel: number,
	maxLightOffset: number,
	maxDarkOffset: number,
	light: boolean,
) {
	if (light) {
		if (backgroundLevel < 50) {
			return 100 - maxLightOffset
		}
		return 100 - maxLightOffset * (1 - (backgroundLevel - 50) / 50)
	} else {
		if (backgroundLevel < 50) {
			return maxDarkOffset
		} else {
			return maxDarkOffset * (1 - (backgroundLevel - 50) / 50)
		}
	}
}

export function getBackgroundSaturation(
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
	colorLightness: number,
	greyLightness: number,
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
	const greyAccent: HslVector = [accentHue, 0, greyLightness]
	const greyComplement: HslVector = [complementHue, 0, greyLightness]
	const maxSaturationAccent: HslVector = [
		accentHue,
		maxSaturation,
		colorLightness,
	]
	const maxSaturationComplement: HslVector = [
		complementHue,
		maxSaturation,
		colorLightness,
	]

	return {
		greyAccent,
		greyComplement,
		maxSaturationAccent,
		maxSaturationComplement,
	}
}

export function getBackgroundHsl(
	hue: number,
	level: number,
	hueShift: number,
	maxLightLightnessOffset: number,
	maxDarkLightnessOffset: number,
	maxChroma: number,
	analogousRange: number,
	complementaryRange: number,
	light: boolean,
): HslVector {
	const h = getOffsetHue(hue, hueShift, analogousRange, complementaryRange)
	const l = getBackgroundLightness(
		level,
		maxLightLightnessOffset,
		maxDarkLightnessOffset,
		light,
	)
	const s = getBackgroundSaturation(h, l, level, maxChroma)
	return [h, s, l]
}

/**
 * Returns a sequence of hue components using the specified step starting from an initial hue.
 * Attempts to cycle in a way that is predictable but does not result in similar neighbor colors.
 * @param start
 * @param step
 * @param size
 * @returns
 */
export function getNominalHues(start: number, step: number, size: number) {
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
	// this accounts for initialHues calculation
	// which can result in minimum counts higher than requested
	return hues.slice(0, size)
}

/**
 * Gets a nominal sequence with even perception based on a core hue set.
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
) {
	let baseSaturation = saturation
	let baseLightness = lightness

	return hues.map((hue, idx) => {
		const hsl = [hue, baseSaturation, baseLightness] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, minSaturation)
		}
		if ((idx + 1) % 6 === 0) {
			baseLightness = Math.max(baseLightness - 1, minLightness)
		}
		return hsl
	})
}

/**
 * Gets the muted nominal sequence by decreasing the saturation and increasing lightness
 * @param hues
 * @param saturation
 * @param minSaturation
 * @param lightness
 * @param minLightness
 * @param saturationShift
 * @param nominalShift
 * @returns
 */
export function getNominalMutedSequence(
	hues: number[],
	saturation: number,
	minSaturation: number,
	lightness: number,
	minLightness: number,
	saturationShift: number,
	nominalShift: number,
) {
	const nominalSaturation = saturation
	let baseSaturation = saturation
	let baseLightness = lightness

	return hues.map((hue, idx) => {
		const hsl = [
			hue,
			0.5 * (nominalSaturation + baseSaturation) - saturationShift,
			0.5 * (lightness + baseLightness) + nominalShift,
		] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, minSaturation)
		}
		if ((idx + 1) % 6 === 0) {
			baseLightness = Math.max(baseLightness - 1, minLightness)
		}
		return hsl
	})
}

/**
 * Gets the bold nominal sequence by increasing the saturation and decreasing lightness
 * @param hues
 * @param saturation
 * @param minSaturation
 * @param lightness
 * @param minLightness
 * @param saturationShift
 * @param nominalShift
 * @returns
 */
export function getNominalBoldSequence(
	hues: number[],
	saturation: number,
	minSaturation: number,
	lightness: number,
	minLightness: number,
	saturationShift: number,
	nominalShift: number,
) {
	const nominalSaturation = saturation
	let baseSaturation = saturation
	let baseLightness = lightness

	return hues.map((hue, idx) => {
		const hsl = [
			hue,
			0.5 * (nominalSaturation + baseSaturation) + saturationShift,
			0.5 * (lightness + baseLightness) - nominalShift,
		] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, minSaturation)
		}
		if ((idx + 1) % 6 === 0) {
			baseLightness = Math.max(baseLightness - 1, minLightness)
		}
		return hsl
	})
}

export function getSequentialSequence(
	hues: number[],
	colorLightness: number,
	greyLightness: number,
	maxSaturation: number,
	size: number,
	offset: number,
) {
	const { greyAccent, maxSaturationAccent } = getAccentsAndComplements(
		hues,
		colorLightness,
		greyLightness,
		maxSaturation,
		offset,
	)
	return polynomialHslSequence(greyAccent, maxSaturationAccent, size)
}

export function getDivergingSequence(
	hues: number[],
	colorLightness: number,
	greyLightness: number,
	maxSaturation: number,
	polynomialExponent: number,
	size: number,
	offset: number,
) {
	const {
		greyAccent,
		greyComplement,
		maxSaturationAccent,
		maxSaturationComplement,
	} = getAccentsAndComplements(
		hues,
		colorLightness,
		greyLightness,
		maxSaturation,
		offset,
	)

	const half = Math.round(size / 2)
	const cut = size % 2 === 0 ? half + 1 : half

	const diverging = polynomialHslSequence(
		greyComplement,
		maxSaturationComplement,
		cut,
		polynomialExponent,
	)
		.slice(1)
		.reverse()

	let toAdd = polynomialHslSequence(
		greyAccent,
		maxSaturationAccent,
		cut,
		polynomialExponent,
	)
	if (size % 2 === 0) {
		toAdd = toAdd.slice(1, cut)
	}
	return diverging.concat(toAdd)
}

export function getAnnotations(
	accentHue: number,
	backgroundLightness: number,
	boldGreyLightness: number,
	lowContrastbackgroundShift: number,
	lightestGrey: number,
	darkestGrey: number,
	light: boolean,
) {
	const mutedGreyLightness = light
		? backgroundLightness - lowContrastbackgroundShift
		: backgroundLightness + lowContrastbackgroundShift

	const annotations = greySequence(
		accentHue,
		5,
		mutedGreyLightness,
		boldGreyLightness,
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

export function getForegroundHsl(
	darkTextLightness: number,
	lightTextLightness: number,
	light: boolean,
): HslVector {
	const textLightness = light ? darkTextLightness : lightTextLightness
	return [0, 0, textLightness]
}

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
