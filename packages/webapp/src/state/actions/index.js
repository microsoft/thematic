import { loadById } from '@thematic/core'
import { createAction } from 'redux-actions'
export const themesLoaded = createAction('App:Themes:Loaded')
export const themeInfoSelected = createAction('App:Themes:Selected')
export const themeLoaded = createAction('App:Theme:Loaded')
export const themeEdited = createAction('App:Theme:Edited')
export const themeVariantToggled = createAction('App:Theme:VariantToggled')
export const paramsChanged = createAction('App:CoolerPicker:Params:All:Changed')
export const chartSizeChanged = createAction('App:Viewer:ChartSize:Changed')
export const drawNodesChanged = createAction('App:Viewer:DrawNodes:Changed')
export const drawLinksChanged = createAction('App:Viewer:DrawLinks:Changed')
export const graphLoaded = createAction('App:Viewer:Graph:Loaded')
export const scaleItemCountChanged = createAction(
	'App:Viewer:ScaleItems:Changed',
)
export const colorBlindnessModeChanged = createAction(
	'App:Viewer:ColorBlindnessMode:Changed',
)
export const themeSelected = themeInfo => dispatch => {
	const theme = loadById(themeInfo.id)
	dispatch(themeInfoSelected(themeInfo))
	dispatch(themeLoaded(theme))
}
