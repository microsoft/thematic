/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ScaleType, SelectionState } from '@thematic/core'
import {
	applyNominalAttrWithSignalState,
	chart,
	circle,
	line,
	plotArea,
	sequential,
} from '@thematic/d3'
import { useThematic } from '@thematic/react'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import type { FC } from 'react'
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'

import type { Edge, Graph, Node } from '../../../../../../types.js'
import { bounds } from '../../../../../../util/graph.js'

export interface GraphProps {
	graph: Graph
	width?: number
	height?: number
	drawNodes?: boolean
	drawLinks?: boolean
	categoricalFill?: boolean
	sequentialFill?: boolean
}

export const D3Graph: FC<GraphProps> = ({
	graph,
	width = 800,
	height = 600,
	drawNodes = true,
	drawLinks = true,
	categoricalFill = false,
	sequentialFill = false,
}) => {
	const theme = useThematic()
	const { nodes, edges } = graph
	const ref = useRef(null)

	const [nodeHover, setNodeHover] = useState(null)
	const [nodeSelect, setNodeSelect] = useState(null)

	const getNodeSelectionState = useCallback(
		(d: any) => {
			if (d.id === nodeHover) {
				return SelectionState.Hovered
			}
			if (d.id === nodeSelect) {
				return SelectionState.Selected
			}
			if (nodeSelect) {
				return SelectionState.Suppressed
			}
			return SelectionState.Normal
		},
		[nodeHover, nodeSelect],
	)

	// construct core positioning for nodes and edges
	useLayoutEffect(() => {
		const [xmin, xmax, ymin, ymax] = bounds(nodes)
		const r = 4
		const xScale = scaleLinear()
			.domain([xmin, xmax])
			.range([r, width - r])
		const yScale = scaleLinear()
			.domain([ymin, ymax])
			.range([r, height - r])

		select(ref.current).select('*').remove()
		const svg = select(ref.current).attr('width', width).attr('height', height)
		const g = svg.append('g').on('mouseup', () => setNodeSelect(null))

		const nmap = nodes.reduce((acc, cur) => {
			acc[cur.id] = cur
			return acc
		}, {} as Record<string, Node>)

		g.selectAll('line')
			.data(edges)
			.enter()
			.append('line')
			.attr('class', 'link')
			.attr('x1', (d) => xScale(nmap[d.source]?.x ?? 0) as number)
			.attr('x2', (d) => xScale(nmap[d.target]?.x ?? 0) as number)
			.attr('y1', (d) => yScale(nmap[d.source]?.y ?? 0) as number)
			.attr('y2', (d) => yScale(nmap[d.target]?.y ?? 0) as number)

		g.selectAll('.node')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('class', 'node')
			.attr('cx', (d) => xScale(d.x) as number)
			.attr('cy', (d) => yScale(d.y) as number)
			.style('cursor', 'pointer')
			.on('mouseover', (d) => setNodeHover(d.id as any))
			.on('mouseout', () => setNodeHover(null))
			.on('mouseup', (d) => setNodeSelect(d.id as any))
	}, [ref, graph, width, height, nodes, edges])

	useLayoutEffect(() => {
		select(ref.current)
			.call(chart as any, theme)
			.select('g')
			.call(plotArea as any, theme)
	}, [theme, ref])

	useLayoutEffect(() => {
		select(ref.current)
			.selectAll<Element, Edge>('line')
			.call(
				line as any,
				theme.link({
					selectionState: drawLinks
						? SelectionState.Normal
						: SelectionState.Hidden,
				}),
			)
	}, [theme, ref, graph, drawLinks, width, height])

	useLayoutEffect(() => {
		select(ref.current)
			.selectAll<Element, Node>('.node')
			.call(
				circle as any,
				theme.node({
					selectionState: drawNodes
						? SelectionState.Normal
						: SelectionState.Hidden,
				}),
			)
	}, [theme, ref, graph, drawNodes, width, height])

	useEffect(() => {
		const n = select<any, any>(ref.current).selectAll<Element, Node>('.node')

		if (drawNodes) {
			if (categoricalFill) {
				const unique = nodes.reduce((acc, cur) => {
					if (cur.community != null) {
						acc[cur.community] = true
					}
					return acc
				}, {} as Record<string, boolean>)
				n.call(
					applyNominalAttrWithSignalState,
					'fill',
					getNodeSelectionState,
					(d: Node) => d.community,
					theme,
					Object.keys(unique).length,
				)
			} else if (sequentialFill) {
				const domain = nodes.map((node) => node.weight).sort((a, b) => a - b)
				n.call(
					circle as any,
					theme.node({
						selectionState: getNodeSelectionState,
						scaleBindings: {
							fill: {
								scale: sequential(theme, domain, ScaleType.Quantile),
								accessor: (d) => d.weight,
							},
						},
					}),
				)
			} else {
				n.call(
					circle as any,
					theme.node({
						selectionState: getNodeSelectionState,
					}),
				)
			}
		}
	}, [
		theme,
		ref,
		graph,
		drawNodes,
		width,
		height,
		nodeHover,
		nodeSelect,
		categoricalFill,
		sequentialFill,
		nodes,
		getNodeSelectionState,
	])

	return <svg ref={ref} />
}
