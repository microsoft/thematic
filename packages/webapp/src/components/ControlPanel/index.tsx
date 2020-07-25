/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { connect } from 'react-redux'
import { ControlPanel as ControlPanelComponent } from './ControlPanel'

import {
	themeLoaded,
	themeSelected,
	themeVariantToggled,
	chartSizeChanged,
	drawNodesChanged,
	drawLinksChanged,
	scaleItemCountChanged,
	colorBlindnessModeChanged,
} from '../../state/actions'

export const ControlPanel = connect(
	(state: any) => ({
		themes: state.themes,
		themeInfo: state.themeInfo,
		chartSize: state.ui.chartSize,
		drawNodes: state.ui.drawNodes,
		drawLinks: state.ui.drawLinks,
		scaleItemCount: state.ui.scaleItemCount,
		colorBlindnessMode: state.ui.colorBlindnessMode,
	}),
	{
		onThemeLoaded: themeLoaded,
		onThemeChange: themeSelected,
		onThemeVariantToggled: themeVariantToggled,
		onChartSizeChange: chartSizeChanged,
		onDrawNodesChange: drawNodesChanged,
		onDrawLinksChange: drawLinksChanged,
		onScaleItemCountChange: scaleItemCountChanged,
		onColorBlindnessModeChange: colorBlindnessModeChanged,
	},
)(ControlPanelComponent)
