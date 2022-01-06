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
		// the full theme includes a variety of additional color mappings, for this we just want the core palette
		const json = themeJson(this._theme)
		const jsonkeys = [
			...this.primaryKeys,
			...this.foregroundKeys,
			...this.backgroundKeys,
		]
		return jsonkeys.reduce((acc, cur) => {
			acc[cur] = json[cur]
			return acc
		}, {})
	}
	get primaryKeys(): string[] {
		return [
			'themeDarker',
			'themeDark',
			'themeDarkAlt',
			'themePrimary',
			'themeSecondary',
			'themeTertiary',
			'themeLight',
			'themeLighter',
			'themeLighterAlt',
		]
	}
	get foregroundKeys(): string[] {
		return [
			'black',
			'neutralDark',
			'neutralPrimary',
			'neutralPrimaryAlt',
			'neutralSecondary',
			'neutralTertiary',
			'white',
		]
	}
	get backgroundKeys(): string[] {
		return [
			'neutralTertiaryAlt',
			'neutralQuaternary',
			'neutralQuaternaryAlt',
			'neutralLight',
			'neutralLighter',
			'neutralLighterAlt',
		]
	}
}
