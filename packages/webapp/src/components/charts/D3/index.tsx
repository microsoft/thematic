/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { axisLeft, axisBottom } from 'd3-axis'
import { scaleLinear } from 'd3-scale'
import { select, Selection } from 'd3-selection'
import { useLayoutEffect, useRef, useState, useMemo } from 'react'
import { SelectionState } from '@thematic/core'
import { chart, plotArea, axis, circle } from '@thematic/d3'
import { useThematic } from '@thematic/react'

interface ChartProps {
	width?: number
	height?: number
}

const MARGIN = 25
const LEGEND_WIDTH = 20
const MIN_RADIUS = 5
const MAX_RADIUS = 15
const CIRCLE_FILL_OPACITY = 0.8
const DATA_LENGTH = 20

/**
 * Simple chart using raw d3, intended to show how scale bindings work
 */
export const D3Chart: React.FC<ChartProps> = ({
	width = 800,
	height = 600,
}) => {
	const theme = useThematic()
	const ref = useRef(null)

	const [svg, setSvg] = useState<Selection<SVGElement, any, SVGElement, any>>()

	const [plot, setPlot] = useState<
		Selection<SVGGElement, any, SVGGElement, any>
	>()

	// random data for scatterplot
	// TODO: load in a meaningful dataset to demonstrate the scatterplot better?
	const data = useMemo(() => {
		return new Array(DATA_LENGTH).fill({}).map(() => ({
			weight: 1 - Math.random() * 2, // make a diverging dataset example
			count: Math.random(),
			x: Math.random(),
			y: Math.random(),
		}))
	}, [])
	const plotHeight = useMemo(() => height - MARGIN * 2, [height])
	const plotWidth = useMemo(() => width - MARGIN * 2 - LEGEND_WIDTH, [width])
	const xScale = useMemo(() => scaleLinear().range([0, plotWidth]), [plotWidth])
	const yScale = useMemo(() => scaleLinear().range([plotHeight, 0]), [
		plotHeight,
	])
	const cxScale = useMemo(
		() => scaleLinear().range([MAX_RADIUS, plotWidth - MAX_RADIUS]),
		[plotWidth],
	)
	const cyScale = useMemo(
		() => scaleLinear().range([plotHeight - MAX_RADIUS, MAX_RADIUS]),
		[plotHeight],
	)

	useLayoutEffect(() => {
		if (ref) select(ref.current).select('*').remove()

		const svg = select(ref.current).call(chart as any, theme, {
			width,
			height,
		})

		setSvg(svg as any)
	}, [height, ref, theme, width])

	useLayoutEffect(() => {
		if (svg) {
			svg.selectAll('g').remove()
			const g = svg.append('g').call(plotArea as any, theme, {
				// room for axes
				marginBottom: MARGIN,
				marginLeft: MARGIN,
				marginTop: MARGIN,
				marginRight: MARGIN + LEGEND_WIDTH,
			})
			setPlot(g as any)
		}
	}, [svg, theme])

	useLayoutEffect(() => {
		if (plot) {
			plot.selectAll('circle').remove()
			// create a series of random circles, with the fill bound to a sequential scale
			const circ = theme.circle({
				selectionState: d =>
					d.weight < 50 ? SelectionState.Selected : SelectionState.Suppressed,
				scaleBindings: {
					fill: {
						scale: theme.scales().diverging2([-1, 1]),
						accessor: d => d.weight,
					},
					radius: {
						scale: scaleLinear().range([MIN_RADIUS, MAX_RADIUS]),
						accessor: d => d.count,
					},
				},
				overrides: {
					strokeWidth: 2,
					strokeOpacity: 0.8,
					stroke: '#222',
					fillOpacity: CIRCLE_FILL_OPACITY,
				},
			})
			plot
				.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
				.call(circle as any, circ)
				.attr('cx', d => cxScale(d.x) as number)
				.attr('cy', d => cyScale(d.y) as number)
		}
	}, [theme, plot, cxScale, cyScale, data])

	useLayoutEffect(() => {
		if (svg) {
			// x axis
			svg.append('g').call(axis as any, theme, axisBottom(xScale), {
				attr: {
					transform: `translate(${MARGIN}, ${plotHeight + MARGIN})`,
				},
			})
			// y axis
			svg.append('g').call(axis as any, theme, axisLeft(yScale), {
				attr: {
					transform: `translate(${MARGIN}, ${MARGIN})`,
				},
			})
		}
	}, [theme, svg, plotHeight, xScale, yScale])

	// add a very simple legend to show the gradient
	useLayoutEffect(() => {
		if (svg) {
			svg.select('.legend').remove()
			const g = svg
				.append('g')
				.attr('class', 'legend')
				.attr('transform', `translate(${plotWidth + MARGIN},${MARGIN})`)
			g.append('rect')
				.attr('width', LEGEND_WIDTH)
				.attr('height', plotHeight)
				.call(plotArea as any, theme)
			const slices = new Array(plotHeight).fill(1)
			const scale = theme.scales().diverging2([0, plotHeight])
			g.selectAll('rect')
				.data(slices)
				.enter()
				.append('rect')
				.attr('width', LEGEND_WIDTH)
				.attr('height', 1)
				.attr('x', 1)
				.attr('y', (d, i) => plotHeight - i)
				.attr('fill', (d, i) => scale(i).hex())
				.attr('fill-opacity', CIRCLE_FILL_OPACITY)
			const labels = [
				{
					t: '1',
					y: 8,
				},
				{
					t: '0',
					y: plotHeight / 2,
				},
				{
					t: '-1',
					y: plotHeight - 8,
				},
			]
			g.selectAll('text')
				.data(labels)
				.enter()
				.append('text')
				.text(d => d.t)
				.attr('fill', theme.axisTickLabels().fill().hex())
				.attr('font-size', 10)
				.attr('x', LEGEND_WIDTH / 2)
				.attr('y', d => d.y)
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')
		}
	}, [theme, svg, plotWidth, plotHeight])

	return <svg ref={ref} />
}
