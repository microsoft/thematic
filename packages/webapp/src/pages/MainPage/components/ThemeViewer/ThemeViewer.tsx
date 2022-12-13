/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	useChartSize,
	useDrawLinks,
	useDrawNodes,
	useGraph,
} from '../../../../state/index.js'
import { ThemeViewer as ThemeViewerBase } from './ThemeViewer.base.js'

export const ThemeViewer = () => {
	const [drawNodes] = useDrawNodes()
	const [drawLinks] = useDrawLinks()
	const [chartSize] = useChartSize()
	const graph = useGraph()
	return (
		<ThemeViewerBase
			drawNodes={drawNodes}
			drawLinks={drawLinks}
			chartSize={chartSize}
			graph={graph}
		/>
	)
}
