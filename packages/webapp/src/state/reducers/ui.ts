/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { combineReducers } from 'redux'
import {
	chartSizeChanged,
	drawNodesChanged,
	drawLinksChanged,
	scaleItemCountChanged,
	colorBlindnessModeChanged,
} from '../actions'
import { handle } from './handle'
import { ColorBlindnessMode } from '@thematic/color'

// chart width for the examples
// for the main charts this'll be a 4/3 aspect ratio
// for graphs we'll use it square
const DEFAULT_CHART_SIZE = 400

const chartSize = handle(chartSizeChanged, DEFAULT_CHART_SIZE)
const drawNodes = handle(drawNodesChanged, true)
const drawLinks = handle(drawLinksChanged, false)
const scaleItemCount = handle(scaleItemCountChanged, 10)
const colorBlindnessMode = handle(
	colorBlindnessModeChanged,
	ColorBlindnessMode.None,
)

export const ui = combineReducers({
	chartSize,
	drawNodes,
	drawLinks,
	scaleItemCount,
	colorBlindnessMode,
})
