/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { scaleLinear } from 'd3-scale'
import { useMemo } from 'react'
import { ChipsProps } from './types'

export const ColorChips: React.FC<ChipsProps> = ({
	scale,
	width = 200,
	height = 10,
	maxItems = 10,
}) => {
	const blocks = useMemo(() => {
		if (height <= 1) {
			return []
		}
		const r = height / 2 - 1
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
					cy={r}
					r={r}
					height={height}
				/>
			))
	}, [scale, width, height, maxItems])
	return (
		<svg width={width} height={height}>
			{blocks}
		</svg>
	)
}
