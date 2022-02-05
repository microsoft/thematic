/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { defaultThemes } from '@thematic/core'
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { graph } from '../data'
import { themeSelected, graphLoaded } from './actions'
import { reducer } from './reducers'
/**
 * State entry point for the app - kicks off async starter data, etc.
 */
export const init = dispatch => {
	dispatch(themeSelected(defaultThemes[0]))
	dispatch(graphLoaded(graph))
}
export const store = createStore(
	reducer,
	compose(applyMiddleware(thunk, logger)),
)
