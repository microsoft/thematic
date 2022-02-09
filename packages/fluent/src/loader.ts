/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Theme } from '@thematic/core'
import { FluentTheme } from './FluentTheme.js'
import type { FluentTheme as IFluentTheme } from './types.js'

/**
 * Load a Fluent theme instance derived from a thematic theme
 * @param theme
 */
export function loadFluentTheme(theme: Theme): IFluentTheme {
	return new FluentTheme(theme)
}
