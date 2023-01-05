/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { atom, useRecoilValue } from 'recoil'

import { graph } from '../data/index.js'
import type { Graph, NodeId } from '../types.js'

const GRAPH_SIZE = 500

const graphState = atom<Graph>({
	key: 'graph',
	default: graph,
})

export function useGraph() {
	const graph = useRecoilValue(graphState)
	// thin the full graph since we're doing slow svg rendering
	return useMemo(() => {
		const nodes = graph.nodes.slice(0, GRAPH_SIZE)
		const map = nodes.reduce((acc, cur) => {
			acc.add(cur.id)
			return acc
		}, new Set<NodeId>())
		const edges = graph.edges.filter(
			(edge) => map.has(edge.source) && map.has(edge.target),
		)
		return {
			nodes,
			edges,
		}
	}, [graph])
}
