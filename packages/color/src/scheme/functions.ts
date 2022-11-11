/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
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
