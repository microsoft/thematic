/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Pivot, PivotItem } from '@fluentui/react'
import { FC } from 'react'
import { Graph } from '../../interfaces'
import { FluentControls } from '../FluentControls'
import { D3Chart } from '../charts/D3'
import { VegaChart, charts } from '../charts/Vega'
import { D3Graph } from '../graphs/D3'
import './index.css'

export interface ThemeViewerProps {
	graph: Graph
	chartSize: number
	drawNodes: boolean
	drawLinks: boolean
}

export const ThemeViewer: FC<ThemeViewerProps> = ({
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
			key="graph-1"
			graph={graph}
			{...common}
			drawNodes={drawNodes}
			drawLinks={drawLinks}
		/>,
		<D3Graph
			key="graph-2"
			graph={graph}
			{...common}
			drawNodes={drawNodes}
			drawLinks={drawLinks}
			categoricalFill
		/>,
		<D3Graph
			key="graph-3"
			graph={graph}
			{...common}
			drawNodes={drawNodes}
			drawLinks={drawLinks}
			sequentialFill
		/>,
	]

	return (
		<div className="theme-wrapper">
			<Pivot>
				<PivotItem headerText="Thematic controls">
					<FluentControls />
				</PivotItem>
				<PivotItem headerText="Example visualizations">
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
				</PivotItem>
			</Pivot>
		</div>
	)
}
