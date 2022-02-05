/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { handleAction } from 'redux-actions'
/**
 * Simpler helper for basic state items that just need to set a value
 */
export function handle(action, defaultState) {
	return handleAction(action, (s, action) => action.payload, defaultState)
}
