/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	ContinuousColorScaleFunction,
	NominalColorScaleFunction,
	Theme,
} from './types/Theme.js'

/**
 * Returns a standard scale instance based on name and planned width.
 * @param theme
 * @param name
 * @param width
 */
export function chooseScale(
	theme: Theme,
	name: string,
	width: number,
): NominalColorScaleFunction | ContinuousColorScaleFunction {
	const scales = theme.scales()
	const domain = [0, width]
	switch (name) {
		case 'sequential':
			return scales.sequential(domain)
		case 'sequential2':
			return scales.sequential2(domain)
		case 'diverging':
			return scales.diverging(domain)
		case 'diverging2':
			return scales.diverging2(domain)
		case 'greys':
			return scales.greys(domain)
		case 'nominalMuted':
			return scales.nominalMuted()
		case 'nominalBold':
			return scales.nominalBold()
		case 'nominal':
		default:
			return scales.nominal()
	}
}
