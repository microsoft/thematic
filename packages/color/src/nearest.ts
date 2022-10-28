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
export function nearest(color: Color, list: Color[]): Color {
	const hue = color.hsluv()[0]
	const distances = list
		.map(c => {
			const chue = c.hsluv()[0]
			return {
				distance: Math.abs(hue - chue),
				color: c,
			}
		})
		.sort((a, b) => a.distance - b.distance)

	return distances[0]!.color
}
