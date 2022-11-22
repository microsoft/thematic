/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { scaleLinear } from 'd3-scale'
import type { FC } from 'react'
import { useMemo } from 'react'

import type { ChipsProps } from './ScaleDropdown.types.js'

export const ColorChips: FC<ChipsProps> = ({
	scale,
	width = 200,
	height = 10,
	maxItems = 10,
}) => {
	const style = useMemo(
		() => ({
			width,
			height,
			minWidth: width,
			minHeight: height,
		}),
		[width, height],
	)

	const blocks = useMemo(() => {
		if (height <= 1) {
			return []
		}

		// use the largest radius that will fit - either half the height or based on the
		// max available width when constrained horizontally
		const hr = height / 2
		const pr = width / maxItems / 2 - 0.5
		const r = pr < hr ? pr : hr

		const x = scaleLinear()
			.domain([0, maxItems - 1])
			.range([r, width - r])

		return scale
			.toArray(maxItems)
			.map((color, i) => (
				<circle
					key={`color-chips-${color}-${i}`}
					fill={color}
					stroke={'none'}
					cx={x(i)}
					cy={hr}
					r={r}
					height={height}
				/>
			))
	}, [scale, width, height, maxItems])
	return (
		<svg style={style} width={width} height={height}>
			{blocks}
		</svg>
	)
}
