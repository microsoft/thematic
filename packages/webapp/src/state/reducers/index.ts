/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { combineReducers } from 'redux'
import { handleAction, handleActions, Action } from 'redux-actions'
import { Graph } from '../../interfaces'
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

import { defaultParams } from '@thematic/color'
import { defaultThemes, clone } from '@thematic/core'

const themes = handle(themesLoaded, defaultThemes)

const themeInfo = handle(themeInfoSelected, defaultThemes[0])

const theme = handleActions(
	{
		[`${themeLoaded}`]: (s, action: Action<any>) => action.payload,
		[`${themeEdited}`]: (s, action: Action<any>) => {
			const { name, value } = action.payload
			const update = {
				[`${name}`]: value,
			}
			return clone(s, update)
		},
		[`${themeVariantToggled}`]: (s, action: Action<any>) => {
			if (s.variant === 'light') {
				return s.dark()
			}
			return s.light()
		},
		[`${colorBlindnessModeChanged}`]: (s, action: Action<any>) =>
			s.colorBlindness(action.payload),
	},
	null,
)

const graph = handleAction(
	graphLoaded,
	(s: Graph, action: Action<Graph>) => {
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
