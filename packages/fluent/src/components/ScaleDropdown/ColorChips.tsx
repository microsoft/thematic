/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { scaleLinear } from 'd3-scale';
import type { FC } from 'react';
import { useMemo } from 'react';

import type { ChipsProps } from './ScaleDropdown.types.js';

export const ColorChips: FC<ChipsProps> = ({ scale, width = 200, height = 10, maxItems = 10 }) => {
	const style = useMemo(
		() => ({
			width,
			height,
			minWidth: width,
			minHeight: height,
		}),
		[width, height],
	);

	const blocks = useMemo(() => {
		if (height <= 1) {
			return [];
		}

		const r = height / 2;
		const x = scaleLinear()
			.domain([0, maxItems - 1])
			.range([r, width - r]);

		return scale
			.toArray(maxItems)
			.map((color, i) => (
				<circle key={`color-chips-${color}-${i}`} fill={color} stroke={'none'} cx={x(i)} cy={r} r={r} height={height} />
			));
	}, [scale, width, height, maxItems]);
	return (
		<svg style={style} width={width} height={height}>
			{blocks}
		</svg>
	);
};
