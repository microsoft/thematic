/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ActionFunctionAny, ReduxCompatibleReducer } from 'redux-actions'
/**
 * Simpler helper for basic state items that just need to set a value
 */
export declare function handle<State>(
	action: ActionFunctionAny<any>,
	defaultState: State,
): ReduxCompatibleReducer<State, State>
