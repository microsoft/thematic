/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ScaleType } from './types/enums.js'
import type {
	ContinuousColorScaleFunction,
	NominalColorScaleFunction,
	Theme,
} from './types/Theme.js'

/**
 * Flexible scale selector
 * @param theme - theme instance
 * @param name - name of the scale type
 * @param nominalCount - if nominal, how many colors to include
 * @param domain - if continuous, input domain (min/max)
 * @param scaleType - if continuous, scale function (linear, log, quantile)
 */
export function chooseScale(
	theme: Theme,
	name: string,
	nominalCount?: number,
	domain?: [number, number],
	scaleType?: ScaleType,
): NominalColorScaleFunction | ContinuousColorScaleFunction {
	const scales = theme.scales()
	switch (name) {
		case 'sequential':
			return scales.sequential(domain, scaleType)
		case 'sequential2':
			return scales.sequential2(domain, scaleType)
		case 'diverging':
			return scales.diverging(domain, scaleType)
		case 'diverging2':
			return scales.diverging2(domain, scaleType)
		case 'greys':
			return scales.greys(domain, scaleType)
		case 'rainbow':
			return scales.rainbow(domain, scaleType)
		case 'nominalMuted':
			return scales.nominalMuted(nominalCount)
		case 'nominalBold':
			return scales.nominalBold(nominalCount)
		case 'nominal':
		default:
			return scales.nominal(nominalCount)
	}
}
