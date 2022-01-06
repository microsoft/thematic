/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Params, ColorBlindnessMode } from '@thematic/color'
import { loadById, Theme, ThemeListing } from '@thematic/core'
import { Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { Graph } from '../../interfaces'

export const themesLoaded = createAction<ThemeListing[]>('App:Themes:Loaded')
export const themeInfoSelected = createAction<ThemeListing>(
	'App:Themes:Selected',
)
export const themeLoaded = createAction<Theme>('App:Theme:Loaded')
export const themeEdited = createAction('App:Theme:Edited')
export const themeVariantToggled = createAction('App:Theme:VariantToggled')

export const paramsChanged = createAction<Params>(
	'App:CoolerPicker:Params:All:Changed',
)

export const chartSizeChanged = createAction<number>(
	'App:Viewer:ChartSize:Changed',
)
export const drawNodesChanged = createAction<boolean>(
	'App:Viewer:DrawNodes:Changed',
)
export const drawLinksChanged = createAction<boolean>(
	'App:Viewer:DrawLinks:Changed',
)
export const graphLoaded = createAction<Graph>('App:Viewer:Graph:Loaded')
export const scaleItemCountChanged = createAction<number>(
	'App:Viewer:ScaleItems:Changed',
)
export const colorBlindnessModeChanged = createAction<ColorBlindnessMode>(
	'App:Viewer:ColorBlindnessMode:Changed',
)

export const themeSelected =
	(themeInfo: ThemeListing) =>
	(dispatch: Dispatch): void => {
		const theme = loadById(themeInfo.id)
		dispatch(themeInfoSelected(themeInfo))
		dispatch(themeLoaded(theme))
	}
