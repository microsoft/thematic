import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Pivot, PivotItem } from '@fluentui/react'
import { FluentControls } from '../FluentControls'
import { D3Chart } from '../charts/D3'
import { VegaChart, charts } from '../charts/Vega'
import { D3Graph } from '../graphs/D3'
import './index.css'
export const ThemeViewer = ({ graph, chartSize, drawNodes, drawLinks }) => {
	const common = {
		width: chartSize,
		height: chartSize * 0.75,
	}
	const graphs = [
		_jsx(
			D3Graph,
			{ graph: graph, ...common, drawNodes: drawNodes, drawLinks: drawLinks },
			'graph-1',
		),
		_jsx(
			D3Graph,
			{
				graph: graph,
				...common,
				drawNodes: drawNodes,
				drawLinks: drawLinks,
				categoricalFill: true,
			},
			'graph-2',
		),
		_jsx(
			D3Graph,
			{
				graph: graph,
				...common,
				drawNodes: drawNodes,
				drawLinks: drawLinks,
				sequentialFill: true,
			},
			'graph-3',
		),
	]
	return _jsx(
		'div',
		{
			className: 'theme-wrapper',
			children: _jsxs(
				Pivot,
				{
					children: [
						_jsx(
							PivotItem,
							{
								headerText: 'Thematic controls',
								children: _jsx(FluentControls, {}, void 0),
							},
							void 0,
						),
						_jsx(
							PivotItem,
							{
								headerText: 'Example visualizations',
								children: _jsxs(
									'div',
									{
										className: 'example-grid',
										children: [
											graphs.map((graph, i) =>
												_jsx(
													'div',
													{ className: 'example-grid-item', children: graph },
													`example-graph-${i}`,
												),
											),
											_jsx(
												'div',
												{
													className: 'example-grid-item',
													children: _jsx(D3Chart, { ...common }, void 0),
												},
												`example-rar-chart`,
											),
											charts.map(chart =>
												_jsx(
													'div',
													{
														className: 'example-grid-item',
														children: _jsx(
															VegaChart,
															{ type: chart, ...common },
															void 0,
														),
													},
													`example-chart-${chart}`,
												),
											),
										],
									},
									void 0,
								),
							},
							void 0,
						),
					],
				},
				void 0,
			),
		},
		void 0,
	)
}
