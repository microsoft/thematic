import { jsx as _jsx } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ScaleType, SelectionState } from '@thematic/core'
import {
	circle,
	line,
	applyNominalAttrWithSignalState,
	sequential,
	chart,
	plotArea,
} from '@thematic/d3'
import { useThematic } from '@thematic/react'
import { scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import {
	useLayoutEffect,
	useState,
	useRef,
	useEffect,
	useCallback,
} from 'react'
import { bounds } from '../../../util/graph'
export const D3Graph = ({
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
		d => {
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
		const svg = select(ref.current).call(chart, theme, { width, height })
		const g = svg.append('g').call(plotArea, theme, {
			on: {
				mouseup: () => setNodeSelect(null),
			},
		})
		const nmap = nodes.reduce((acc, cur) => {
			acc[cur.id] = cur
			return acc
		}, {})
		g.selectAll('line')
			.data(edges)
			.enter()
			.append('line')
			.attr('class', 'link')
			.attr('x1', d => xScale(nmap[d.source].x))
			.attr('x2', d => xScale(nmap[d.target].x))
			.attr('y1', d => yScale(nmap[d.source].y))
			.attr('y2', d => yScale(nmap[d.target].y))
			.call(line, theme.link({ selectionState: SelectionState.Hidden }))
		g.selectAll('.node')
			.data(nodes)
			.enter()
			.append('circle')
			.attr('class', 'node')
			.attr('cx', d => xScale(d.x))
			.attr('cy', d => yScale(d.y))
			.style('cursor', 'pointer')
			.on('mouseover', d => setNodeHover(d.id))
			.on('mouseout', () => setNodeHover(null))
			.on('mouseup', d => setNodeSelect(d.id))
			.call(circle, theme.node({ selectionState: SelectionState.Hidden }))
	}, [theme, graph, width, height, nodes, edges])
	useEffect(() => {
		select(ref.current)
			.selectAll('line')
			.call(
				line,
				theme.link({
					selectionState: drawLinks
						? SelectionState.Normal
						: SelectionState.Hidden,
				}),
			)
	}, [theme, graph, drawLinks, width, height])
	useEffect(() => {
		select(ref.current)
			.selectAll('.node')
			.call(
				circle,
				theme.node({
					selectionState: drawNodes
						? SelectionState.Normal
						: SelectionState.Hidden,
				}),
			)
	}, [theme, graph, drawNodes, width, height])
	useEffect(() => {
		const n = select(ref.current).selectAll('.node')
		if (drawNodes) {
			if (categoricalFill) {
				const unique = nodes.reduce((acc, cur) => {
					if (cur.community != null) {
						acc[cur.community] = true
					}
					return acc
				}, {})
				n.call(
					applyNominalAttrWithSignalState,
					'fill',
					getNodeSelectionState,
					d => d.community,
					theme,
					Object.keys(unique).length,
				)
			} else if (sequentialFill) {
				const domain = nodes.map(node => node.weight).sort((a, b) => a - b)
				n.call(
					circle,
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
					circle,
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
	return _jsx('svg', { ref: ref }, void 0)
}
