/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { defaultParams } from '@thematic/color'
import { defaultThemes, clone } from '@thematic/core'
import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'
import {
	themesLoaded,
	themeInfoSelected,
	themeLoaded,
	themeEdited,
	themeVariantToggled,
	graphLoaded,
	paramsChanged,
	colorBlindnessModeChanged,
} from '../actions'
import { handle } from './handle'
import { ui } from './ui'
const themes = handle(themesLoaded, defaultThemes)
const themeInfo = handle(themeInfoSelected, defaultThemes[0])
const theme = handleActions(
	{
		[`${themeLoaded}`]: (s, action) => action.payload,
		[`${themeEdited}`]: (s, action) => {
			const { name, value } = action.payload
			const update = {
				[`${name}`]: value,
			}
			return clone(s, update)
		},
		[`${themeVariantToggled}`]: (s, action) => {
			if (s.variant === 'light') {
				return s.dark()
			}
			return s.light()
		},
		[`${colorBlindnessModeChanged}`]: (s, action) =>
			s.colorBlindness(action.payload),
	},
	null,
)
const graph = handleAction(
	graphLoaded,
	(s, action) => {
		// strip off the outer 'graph' root field used in rainbow hydra datasets
		// return action.payload.graph
		return {
			nodes: action.payload.nodes,
			edges: action.payload.edges,
		}
	},
	{ nodes: [], edges: [] },
)
const params = handle(paramsChanged, defaultParams)
export const reducer = combineReducers({
	themes,
	themeInfo,
	theme,
	ui,
	graph,
	params,
})
