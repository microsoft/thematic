/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './ThemeViewer.css';

import { Pivot, PivotItem } from '@fluentui/react';
import type { FC } from 'react';
import { useMemo } from 'react';

import type { Graph } from '../../../../types.js';
import { D3Chart } from './charts/D3/index.js';
import { charts, VegaChart } from './charts/Vega/index.js';
import { FluentControls } from './FluentControls/index.js';
import { D3Graph } from './graphs/D3/index.js';

export interface ThemeViewerProps {
	graph: Graph;
	chartSize: number;
	drawNodes: boolean;
	drawLinks: boolean;
}

export const ThemeViewer: FC<ThemeViewerProps> = ({ graph, chartSize, drawNodes, drawLinks }) => {
	const common = useMemo(
		() => ({
			width: chartSize,
			height: chartSize * 0.75,
		}),
		[chartSize],
	);

	const graphs = [
		<D3Graph key="graph-1" graph={graph} {...common} drawNodes={drawNodes} drawLinks={drawLinks} />,
		<D3Graph
			key="graph-2"
			graph={graph}
			{...common}
			drawNodes={drawNodes}
			drawLinks={drawLinks}
			categoricalFill={true}
		/>,
		<D3Graph
			key="graph-3"
			graph={graph}
			{...common}
			drawNodes={drawNodes}
			drawLinks={drawLinks}
			sequentialFill={true}
		/>,
	];

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
						<div className="example-grid-item" key={'example-rar-chart'}>
							<D3Chart {...common} />
						</div>
						{charts.map((chart) => (
							<div className="example-grid-item" key={`example-chart-${chart}`}>
								<VegaChart type={chart} {...common} />
							</div>
						))}
					</div>
				</PivotItem>
			</Pivot>
		</div>
	);
};
