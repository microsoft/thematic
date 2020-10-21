/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { memo, useLayoutEffect, useRef, useMemo } from 'react'

import { useThematic } from '@thematic/react'
import { vega as decorator } from '@thematic/vega'
const vega = require('vega')

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

interface VegaChartProps {
	type: string
	width?: number
	height?: number
}

export const VegaChart: React.FC<VegaChartProps> = memo(function VegaChart({
	type,
	width = 800,
	height = 600,
}) {
	const theme = useThematic()
	const ref = useRef(null)
	const view = useMemo(() => {
		const spec = specs[type]
		const merged = decorator(theme, spec, width, height)
		const parsed = vega.parse(merged)
		return new vega.View(parsed).renderer('svg')
	}, [height, theme, type, width])

	useLayoutEffect(() => {
		view.initialize(ref.current).run()
	})

	return <div ref={ref} />
})
