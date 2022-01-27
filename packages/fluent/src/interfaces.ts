/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme as IFluentTheme } from '@fluentui/react'
import { Theme as IThematicTheme } from '@thematic/core'

/**
 * This interface provides a mapping from thematic theme config to a theme suitable for use
 * with the Fluent UI library.
 * https://developer.microsoft.com/en-us/fluentui#/
 * Dev docs: https://developer.microsoft.com/en-us/fluentui#/controls/web
 */
export interface FluentTheme extends IFluentTheme, IThematicTheme {
	/**
	 * Name of the theme. This is redundant to both, but normalizes the type.
	 */
	name: string
	/**
	 * Returns the core thematic theme used to instantiate this joint instance.
	 */
	toThematic: () => IThematicTheme
	/**
	 * Returns a Fluent-compatible theme object, suitable to apply to the ThemeProvider component
	 * See https://developer.microsoft.com/en-us/fluentui#/controls/web/themes
	 */
	toFluent: () => IFluentTheme
}
