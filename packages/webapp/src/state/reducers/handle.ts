/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	handleAction,
	Action,
	ActionFunctionAny,
	ReduxCompatibleReducer,
} from 'redux-actions'

/**
 * Simpler helper for basic state items that just need to set a value
 */
export function handle<State>(
	action: ActionFunctionAny<any>,
	defaultState: State,
): ReduxCompatibleReducer<State, State> {
	return handleAction<State, State>(
		action,
		(s: State, action: Action<State>) => action.payload,
		defaultState,
	)
}
