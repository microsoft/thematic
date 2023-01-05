/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Color } from './Color.js'

/**
 * Finds the closest match from one color within a list.
 *
 * This just uses the Hue component from the HSLuv variant.
 * The idea is that we just want the visually closest color.
 *
 * If you need something like Euclidean distance use chrome-js.distance directly.
 * @param color
 * @param list
 */
export function nearest(input: Color, list: Color[]): Color {
	const hsl = input.hsluv()
	const distances = list.map((color) => {
		const hsl2 = color.hsluv()
		const left = hsl[0]
		const right = hsl2[0]
		let delta1 = Math.abs(left - right)
		if (delta1 > 180) {
			delta1 = 360 - delta1
		}
		return {
			distance: delta1,
			color,
		}
	})
	return distances.sort((a, b) => a.distance - b.distance)[0]!.color
}
