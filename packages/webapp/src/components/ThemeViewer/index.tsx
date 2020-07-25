/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { connect } from 'react-redux'
import { ThemeViewer as ThemeViewerComponent } from './ThemeViewer'

export const ThemeViewer = connect((state: any) => ({
	chartSize: state.ui.chartSize,
	drawNodes: state.ui.drawNodes,
	drawLinks: state.ui.drawLinks,
	graph: state.graph,
}))(ThemeViewerComponent)
