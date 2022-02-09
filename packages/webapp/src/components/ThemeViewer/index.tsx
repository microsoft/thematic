/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useGraph, useChartSize, useDrawLinks, useDrawNodes } from '../../state'
import { ThemeViewer as ThemeViewerComponent } from './ThemeViewer'

export const ThemeViewer = () => {
	const [drawNodes] = useDrawNodes()
	const [drawLinks] = useDrawLinks()
	const [chartSize] = useChartSize()
	const [graph] = useGraph()
	return (
		<ThemeViewerComponent
			drawNodes={drawNodes}
			drawLinks={drawLinks}
			chartSize={chartSize}
			graph={graph}
		/>
	)
}
