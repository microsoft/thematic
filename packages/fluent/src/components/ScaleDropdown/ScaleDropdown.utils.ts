/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react'

import { ColorChips } from './ColorChips.js'
import { ContinuousBand } from './ContinuousBand.js'
import type { ChipsProps } from './ScaleDropdown.types.js'

export function selectColorPalette(key: string): FC<ChipsProps> {
	if (key === 'nominal' || key === 'nominalMuted' || key === 'nominalBold') {
		return ColorChips
	}
	return ContinuousBand
}
