/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createTheme, Theme as IFluentTheme } from '@fluentui/react'
import { Theme as IThematicTheme, ThemeImpl, ThemeVariant } from '@thematic/core'
import { FluentTheme as IThematicFluentTheme } from './interfaces'
import { themeJson } from './themeJson'

/**
 * Wraps a thematic theme to output Fluent palettes.
 * This implements both interfaces, so it can be passed to providers for
 * Thematic alone, Fluent alone, or combined (see ThematicFluentProvider).
 */
export class FluentTheme extends ThemeImpl implements IThematicFluentTheme {
	private _tTheme: IThematicTheme
	private _fTheme: IFluentTheme
	constructor(theme: IThematicTheme) {
		super(theme.spec, theme.config)
		this._tTheme = theme
		this._fTheme = createTheme({
			palette: themeJson(theme),
			isInverted: theme.variant === ThemeVariant.Dark,
		})
	}
	toThematic(): IThematicTheme {
		return this._tTheme
	}
	toFluent(): IFluentTheme {
		return this._fTheme
	}
	// these are core interface properties of the Fluent IScheme
	get disableGlobalClassNames() {
		return this._fTheme.disableGlobalClassNames
	}
	get effects() {
		return this._fTheme.effects
	}
	get fonts() {
		return this._fTheme.fonts
	}
	get isInverted() {
		return this._fTheme.isInverted
	}
	get palette() {
		return this._fTheme.palette
	}
	get semanticColors () {
		return this._fTheme.semanticColors
	}
	get rtl() {
		return this._fTheme.rtl
	}
	get spacing() {
		return this._fTheme.spacing
	}
}
