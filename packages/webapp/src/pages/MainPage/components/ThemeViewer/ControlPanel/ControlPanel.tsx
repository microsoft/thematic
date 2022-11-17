/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	useChartSize,
	useDrawLinks,
	useDrawNodes,
} from '../../../../../state/ui.js'
import { ControlPanel as ControlPanelBase } from './ControlPanel.base.js'

export const ControlPanel = () => {
	const [drawNodes, setDrawNodes] = useDrawNodes()
	const [drawLinks, setDrawLinks] = useDrawLinks()
	const [chartSize, setChartSize] = useChartSize()
	return (
		<ControlPanelBase
			drawNodes={drawNodes}
			onDrawNodesChange={setDrawNodes}
			drawLinks={drawLinks}
			onDrawLinksChange={setDrawLinks}
			chartSize={chartSize}
			onChartSizeChange={setChartSize}
		/>
	)
}
