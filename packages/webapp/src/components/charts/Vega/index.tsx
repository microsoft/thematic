/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useThematic } from '@thematic/react'
import { vega as decorator } from '@thematic/vega'
import type { FC } from 'react'
import { memo, useLayoutEffect, useRef, useMemo } from 'react'

import { parse, View } from 'vega'

import area from './specs/area.json'
import bar from './specs/bar.json'
import donut from './specs/donut.json'
import heatmap from './specs/heatmap.json'
import line from './specs/line.json'
import pyramid from './specs/pyramid.json'
import scatterPlot from './specs/scatter-plot.json'
import stackedArea from './specs/stacked-area.json'
import stackedBar from './specs/stacked-bar.json'
import sunburst from './specs/sunburst.json'

const specs: Record<string, any> = {
	heatmap,
	bar,
	stackedBar,
	line,
	area,
	stackedArea,
	scatterPlot,
	donut,
	pyramid,
	sunburst,
}

export const charts = Object.keys(specs)

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
