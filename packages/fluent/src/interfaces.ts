/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ITheme } from '@fluentui/react'
import { Theme } from '@thematic/core'

/**
 * This interface provides a mapping from thematic theme config to a theme suitable for use
 * with the Fluent UI library.
 * https://developer.microsoft.com/en-us/fluentui#/
 * Dev docs: https://developer.microsoft.com/en-us/fluentui#/controls/web
 */
export interface FluentTheme {
	/**
	 * The thematic theme underlying this Fluent mapping
	 */
	theme: Theme
	/**
	 * List of keys for the primary theme colors
	 */
	primaryKeys: string[]
	/**
	 * List of keys for the foreground theme colors
	 */
	foregroundKeys: string[]
	/**
	 * List of keys for the background theme colors
	 */
	backgroundKeys: string[]
	/**
	 * Returns a Fluent-compatible theme object, suitable to apply to the ThemeProvider component
	 * See https://developer.microsoft.com/en-us/fluentui#/controls/web/themes
	 */
	toFluent: () => ITheme
	/**
	 * Returns the JSON definition of the computed Fluent theme palette
	 */
	toJSON: () => { [key: string]: string }
}
