/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	Theme,
	NominalColorScaleFunction,
	ContinuousColorScaleFunction,
} from '@thematic/core'
import type { FC } from 'react'
import { ColorChips } from './ColorChips.js'
import { ContinuousBand } from './ContinuousBand.js'
import type { ChipsProps } from './types.js'

export function chooseScale(
	theme: Theme,
	key: string,
	width: number,
): NominalColorScaleFunction | ContinuousColorScaleFunction {
	const scales = theme.scales()
	const domain = [0, width]
	switch (key) {
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

export function selectColorPalette(key: string): FC<ChipsProps> {
	if (key === 'nominal' || key === 'nominalMuted' || key === 'nominalBold') {
		return ColorChips
	}
	return ContinuousBand
}
