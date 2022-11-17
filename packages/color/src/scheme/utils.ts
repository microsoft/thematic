/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
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
