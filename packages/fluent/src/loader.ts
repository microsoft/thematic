/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FluentTheme } from './FluentTheme'
import { FluentTheme as IFluentTheme } from './interfaces'
import { Theme } from '@thematic/core'

/**
 * Load a Fluent theme instance derived from a thematic theme
 * @param theme
 */
export function loadFluentTheme(theme: Theme): IFluentTheme {
	return new FluentTheme(theme)
}
