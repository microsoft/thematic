/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { useMemo } from 'react'
import { ChipsProps } from './types'

export const ContinuousBand: React.FC<ChipsProps> = ({
	scale,
	width,
	height,
}) => {
	const blocks = useMemo(() => {
		return scale
			.toArray(width)
			.map((color, i) => (
				<rect
					key={`continuous-band-${color}-${i}`}
					fill={color}
					stroke={'none'}
					x={i}
					width={2}
					height={height}
				/>
			))
	}, [scale, width, height])
	return (
		<svg width={width} height={height}>
			{blocks}
		</svg>
	)
}
