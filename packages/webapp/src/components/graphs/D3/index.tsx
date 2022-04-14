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

import type { Edge, Graph, Node } from '../../../interfaces'
import { bounds } from '../../../util/graph'

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

	useLayoutEffect(() => {
		const [xmin, xmax, ymin, ymax] = bounds(nodes)
		const r = theme.node().radius()
		const xScale = scaleLinear()
			.domain([xmin, xmax])
			.range([r, width - r])
		const yScale = scaleLinear()
			.domain([ymin, ymax])
			.range([r, height - r])

		select(ref.current).select('*').remove()
		const svg = select(ref.current).call(chart as any, theme, { width, height })
		const g = svg.append('g').call(plotArea as any, theme, {
			on: {
				mouseup: () => setNodeSelect(null),
			},
		})

		const nmap = nodes.reduce((acc, cur) => {
			acc[cur.id] = cur
			return acc
		}, {} as Record<string, Node>)

		g.selectAll('line')
			.data(edges)
			.enter()
			.append('line')
			.attr('class', 'link')
			.attr('x1', d => xScale(nmap[d.source]!.x) as number)
			.attr('x2', d => xScale(nmap[d.target]!.x) as number)
			.attr('y1', d => yScale(nmap[d.source]!.y) as number)
			.attr('y2', d => yScale(nmap[d.target]!.y) as number)
			.call(line as any, theme.link({ selectionState: SelectionState.Hidden }))

		g.selectAll('.node')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('class', 'node')
			.attr('cx', d => xScale(d.x) as number)
			.attr('cy', d => yScale(d.y) as number)
			.style('cursor', 'pointer')
			.on('mouseover', d => setNodeHover(d.id as any))
			.on('mouseout', () => setNodeHover(null))
			.on('mouseup', d => setNodeSelect(d.id as any))
			.call(
				circle as any,
				theme.node({ selectionState: SelectionState.Hidden }),
			)
	}, [theme, graph, width, height, nodes, edges])

	useEffect(() => {
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
	}, [theme, graph, drawLinks, width, height])

	useEffect(() => {
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
	}, [theme, graph, drawNodes, width, height])

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
				const domain = nodes.map(node => node.weight).sort((a, b) => a - b)
				n.call(
					circle as any,
					theme.node({
						selectionState: getNodeSelectionState,
						scaleBindings: {
							fill: {
								scale: sequential(theme, domain, ScaleType.Quantile),
								accessor: d => d.weight,
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
