/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo, useLayoutEffect, useRef, useMemo, FC } from 'react'

import { parse, View } from 'vega'
import { useThematic } from '@thematic/react'
import { vega as decorator } from '@thematic/vega'

export const charts = [
	'heatmap',
	'bar',
	'stacked-bar',
	'line',
	'area',
	'stacked-area',
	'scatter-plot',
	'donut',
	'pyramid',
	'sunburst',
]

const specs = charts.reduce((acc, cur) => {
	acc[cur] = require(`./specs/${cur}.json`)
	return acc
}, {})

export interface VegaChartProps {
	type: string
	width?: number
	height?: number
}

export const VegaChart: FC<VegaChartProps> = memo(function VegaChart({
	type,
	width = 800,
	height = 600,
}) {
	const theme = useThematic()
	const ref = useRef<HTMLDivElement>(null)
	const view = useMemo(() => {
		const spec = specs[type]
		const merged = decorator(theme, spec, width, height)
		const parsed = parse(merged)
		return new View(parsed).renderer('svg')
	}, [height, theme, type, width])

	useLayoutEffect(() => {
		if (ref.current != null) {
			view.initialize(ref.current).run()
		}
	})

	return <div ref={ref} />
})
