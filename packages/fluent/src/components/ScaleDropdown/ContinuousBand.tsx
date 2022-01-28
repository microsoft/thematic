/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, useMemo } from 'react'
import { ChipsProps } from './types'

export const ContinuousBand: FC<ChipsProps> = ({ scale, width, height }) => {
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
		<svg style={style} width={width} height={height}>
			{blocks}
		</svg>
	)
}
