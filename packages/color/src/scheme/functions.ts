/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import chroma from 'chroma-js'

import { hsluv2hex } from '../chroma.js'
import type { HslVector } from '../types.js'

/**
 * Creates a polynomial number sequence of {size} entries from {start} to {end}.
 * @param start
 * @param end
 * @param size
 * @param exponent
 * @returns
 */
export function polynomialSequence(
	start: number,
	end: number,
	size: number,
	exponent = 1,
): number[] {
	const base = 1 / (size - 1)
	const interval = end - start
	const result: number[] = []
	for (let i = 0; i < size; i++) {
		result.push(start + interval * (i * base) ** exponent)
	}
	return result
}

/**
 * Creates a sequence of HSL values interpolated from {start} to {end}
 * @param start
 * @param end
 * @param size
 * @param exp
 * @returns
 */
export function polynomialHslSequence(
	start: HslVector,
	end: HslVector,
	size: number,
	exp = 1,
): HslVector[] {
	const [sh, ss, sl] = start
	const [eh, es, el] = end
	const hues = polynomialSequence(sh, eh, size, exp)
	const saturations = polynomialSequence(ss, es, size, exp)
	const luminances = polynomialSequence(sl, el, size, exp)
	const hexvalues: HslVector[] = []
	for (let i = 0; i < size; i++) {
		hexvalues.push([
			hues[i] as number,
			saturations[i] as number,
			luminances[i] as number,
		])
	}
	return hexvalues
}

/**
 * Creates a sequence of greys from a {start} to {end} luminance.
 * Note the optional saturation - by default this is 0 for pure greys,
 * but if you want some of the hue mixed in to warm or cool the sequence
 * you can bump this.
 * @param hue
 * @param size
 * @param startLuminance
 * @param endLuminance
 * @param saturation
 * @returns
 */
export function greySequence(
	hue: number,
	size: number,
	startLuminance: number,
	endLuminance: number,
	saturation = 0,
) {
	const greyFrom: HslVector = [hue, saturation, startLuminance]
	const greyTo: HslVector = [hue, saturation, endLuminance]
	return polynomialHslSequence(greyFrom, greyTo, size)
}

/**
 * Transforms a list of HSLuv vectors to hex strings.
 * @param values
 * @returns
 */
export function hsluvList2HexList(values: HslVector[]): string[] {
	return values.map(([h, s, l]) => hsluv2hex(h, s, l))
}

/**
 * Gets an offset hue based on the hue shift param.
 * This is used to tilt the background color slightly.
 * @param hsl
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

export function normalizeSaturation(
	hue: number,
	luminance: number,
	maxBackgroundChroma: number,
) {
	let satGivingMaxChroma = 100
	// TODO: hsluv to hsl function
	let c = chroma.hex(hsluv2hex(hue, 100, luminance)).hcl()[1]
	while (c > maxBackgroundChroma && satGivingMaxChroma >= 0) {
		satGivingMaxChroma -= 1
		c = chroma.hex(hsluv2hex(hue, satGivingMaxChroma, luminance)).hcl()[1]
	}
	return satGivingMaxChroma
}

export function getBackgroundLuminance(
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
	luminance: number,
	backgroundLevel: number,
	maxBackgroundChroma: number,
): number {
	if (backgroundLevel < 50) {
		return (
			(backgroundLevel *
				normalizeSaturation(hue, luminance, maxBackgroundChroma)) /
			50
		)
	} else {
		return normalizeSaturation(hue, luminance, maxBackgroundChroma)
	}
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
export function getAccentsAndComplements(
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

export function getBackgroundHsl(
	hue: number,
	backgroundLevel: number,
	backgroundHueShift: number,
	maxLightLuminanceOffset: number,
	maxDarkLuminanceOffset: number,
	maxBackgroundChroma: number,
	analogousRange: number,
	complementaryRange: number,
	light: boolean,
): HslVector {
	const h = getOffsetHue(
		hue,
		backgroundHueShift,
		analogousRange,
		complementaryRange,
	)
	const l = getBackgroundLuminance(
		backgroundLevel,
		maxLightLuminanceOffset,
		maxDarkLuminanceOffset,
		light,
	)
	const s = getBackgroundSaturation(h, l, backgroundLevel, maxBackgroundChroma)
	return [h, s, l]
}

/**
 * Returns a sequence of hue components using the specified step starting from an initial hue.
 * Attempts to cycle in a way that is predictable but does not result in similar neighbor colors.
 * @param accentHsl
 * @param nominalHueStep
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
	// this acounts for initialHues calculation
	// which can result in minimum counts higher than requested
	return hues.slice(0, size)
}

export function getNominalSequence(
	hues: number[],
	saturation: number,
	minimumSaturation: number,
	luminance: number,
	minimumLuminance: number,
) {
	let baseSaturation = saturation
	let baseLuminance = luminance

	return hues.map((hue, idx) => {
		const hsl = [hue, baseSaturation, baseLuminance] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, minimumSaturation)
		}
		if ((idx + 1) % 6 === 0) {
			baseLuminance = Math.max(baseLuminance - 1, minimumLuminance)
		}
		return hsl
	})
}

export function getNominalMutedSequence(
	hues: number[],
	saturation: number,
	minimumSaturation: number,
	luminance: number,
	minimumLuminance: number,
	mutedSaturationShift: number,
	nominalLighterShift: number,
) {
	const nominalSaturation = saturation
	let baseSaturation = saturation
	let baseLuminance = luminance

	return hues.map((hue, idx) => {
		const hsl = [
			hue,
			0.5 * (nominalSaturation + baseSaturation) - mutedSaturationShift,
			0.5 * (luminance + baseLuminance) + nominalLighterShift,
		] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, minimumSaturation)
		}
		if ((idx + 1) % 6 === 0) {
			baseLuminance = Math.max(baseLuminance - 1, minimumLuminance)
		}
		return hsl
	})
}

export function getNominalBoldSequence(
	hues: number[],
	saturation: number,
	minimumSaturation: number,
	luminance: number,
	minimumLuminance: number,
	boldSaturationShift: number,
	nominalDarkerShift: number,
) {
	const nominalSaturation = saturation
	let baseSaturation = saturation
	let baseLuminance = luminance

	return hues.map((hue, idx) => {
		const hsl = [
			hue,
			0.5 * (nominalSaturation + baseSaturation) + boldSaturationShift,
			0.5 * (luminance + baseLuminance) - nominalDarkerShift,
		] as HslVector
		if ((idx + 1) % 3 === 0) {
			baseSaturation = Math.max(baseSaturation - 1, minimumSaturation)
		}
		if ((idx + 1) % 6 === 0) {
			baseLuminance = Math.max(baseLuminance - 1, minimumLuminance)
		}
		return hsl
	})
}

export function getSequentialSequence(
	hues: number[],
	colorLuminance: number,
	greyLuminance: number,
	maxSaturation: number,
	size: number,
	offset: number,
) {
	const { greyAccent, maxSaturationAccent } = getAccentsAndComplements(
		hues,
		colorLuminance,
		greyLuminance,
		maxSaturation,
		offset,
	)
	return polynomialHslSequence(greyAccent, maxSaturationAccent, size)
}

export function getDivergingSequence(
	hues: number[],
	colorLuminance: number,
	greyLuminance: number,
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
		colorLuminance,
		greyLuminance,
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

export function getForegroundHsl(
	light: boolean,
	darkTextLuminance: number,
	lightTextLuminance: number,
): HslVector {
	const textLuminance = light ? darkTextLuminance : lightTextLuminance
	return [0, 0, textLuminance]
}

export function getOffsetBackgroundHsl(
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
