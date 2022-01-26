/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createTheme, ITheme } from '@fluentui/react'
import { Theme, ThemeVariant } from '@thematic/core'
import { FluentTheme as IFluentTheme } from './interfaces'
import { themeJson } from './themeJson'

/**
 * Wraps a thematic theme to output Fluent palettes.
 * TODO: it would be nice if this implemented Fluent's theme interface
 * directly so it could be passed as is to a ThemeContext.
 */
export class FluentTheme implements IFluentTheme {
	private _theme: Theme
	constructor(theme: Theme) {
		this._theme = theme
	}
	get theme(): Theme {
		return this._theme
	}
	toFluent(): ITheme {
		const inverted = this._theme.variant === ThemeVariant.Dark
		const json = themeJson(this._theme)
		return createTheme({
			...{ palette: json },
			isInverted: inverted,
		})
	}
	toJSON(): Record<string, string> {
		return themeJson(this._theme)
	}
}
