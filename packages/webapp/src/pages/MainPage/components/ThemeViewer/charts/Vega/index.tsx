/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Theme } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { vega } from '@thematic/vega'
import { useDebounceEffect } from 'ahooks'
import type { FC, RefObject } from 'react'
import { memo, useCallback, useRef } from 'react'
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
	scatterPlot,
	bar,
	area,
	stackedBar,
	stackedArea,
	line,
	donut,
	pyramid,
	sunburst,
	heatmap,
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
	const render = useCallback(
		(ref: RefObject<HTMLDivElement>, theme: Theme) => {
			if (ref.current) {
				const spec = specs[type]
				const merged = vega(theme, spec, { width, height })
				const parsed = parse(merged)
				new View(parsed).renderer('svg').initialize(ref.current).run()
			}
		},
		[type, width, height],
	)

	useDebounceEffect(() => render(ref, theme), [ref, theme], {
		wait: 200,
	})

	return <div ref={ref} />
})
