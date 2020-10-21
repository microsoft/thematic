/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	BaseSlots,
	IThemeRules,
	themeRulesStandardCreator,
	ThemeGenerator,
	createTheme,
	ITheme,
} from '@fluentui/react'
import { FluentTheme as IFluentTheme } from './interfaces'
import { Theme, ThemeVariant } from '@thematic/core'

const initialize = (colors, inverted: boolean): IThemeRules => {
	const themeRules = themeRulesStandardCreator()
	ThemeGenerator.insureSlots(themeRules, inverted)
	ThemeGenerator.setSlot(
		themeRules[BaseSlots[BaseSlots.primaryColor]],
		colors.primaryColor,
	)
	ThemeGenerator.setSlot(
		themeRules[BaseSlots[BaseSlots.foregroundColor]],
		colors.textColor,
	)
	ThemeGenerator.setSlot(
		themeRules[BaseSlots[BaseSlots.backgroundColor]],
		colors.backgroundColor,
	)
	ThemeGenerator.insureSlots(themeRules, inverted)
	return themeRules
}

export class FluentTheme implements IFluentTheme {
	private _theme: Theme
	private _themeRules: IThemeRules
	constructor(theme: Theme) {
		const colors = {
			primaryColor: theme.application().accent().hex(),
			textColor: theme.application().foreground().hex(),
			backgroundColor: theme.application().background().hex(),
		}
		const themeRules = initialize(colors, theme.variant === ThemeVariant.Dark)
		this._theme = theme
		this._themeRules = themeRules
	}
	get theme(): Theme {
		return this._theme
	}
	toFluent(): ITheme {
		return createTheme({
			...{ palette: this.toJSON() },
			isInverted: this._theme.variant === ThemeVariant.Dark,
		})
	}
	toJSON(): { [key: string]: string } {
		// the full theme includes a variety of additional color mappings, for this we just want the core palette
		const json = ThemeGenerator.getThemeAsJson(this._themeRules)
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
