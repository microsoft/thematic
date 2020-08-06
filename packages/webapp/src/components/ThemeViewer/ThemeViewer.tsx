/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { Graph } from '../../interfaces'
import { VegaChart, charts } from '../charts/Vega'
import { D3Chart } from '../charts/D3'
import { D3Graph } from '../graphs/D3'
import './index.css'

export interface ThemeViewerProps {
	graph: Graph
	chartSize: number
	drawNodes: boolean
	drawLinks: boolean
}

export const ThemeViewer: React.FC<ThemeViewerProps> = ({
	graph,
	chartSize,
	drawNodes,
	drawLinks,
}) => {
	const common = {
		width: chartSize,
		height: chartSize * 0.75,
	}

	const graphs = [
		<D3Graph
			graph={graph}
			{...common}
			drawNodes={drawNodes}
			drawLinks={drawLinks}
		/>,
		<D3Graph
			graph={graph}
			{...common}
			drawNodes={drawNodes}
			drawLinks={drawLinks}
			categoricalFill
		/>,
		<D3Graph
			graph={graph}
			{...common}
			drawNodes={drawNodes}
			drawLinks={drawLinks}
			sequentialFill
		/>,
	]

	return (
		<div className="theme-wrapper">
			<div className="example-grid">
				{graphs.map((graph, i) => (
					<div className="example-grid-item" key={`example-graph-${i}`}>
						{graph}
					</div>
				))}
				<div className="example-grid-item" key={`example-rar-chart`}>
					<D3Chart {...common} />
				</div>
				{charts.map(chart => (
					<div className="example-grid-item" key={`example-chart-${chart}`}>
						<VegaChart type={chart} {...common} />
					</div>
				))}
			</div>
		</div>
	)
}