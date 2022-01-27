/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { darken, lighten } from '@thematic/color'

/**
 * The getShade/getBackgroundShade functions in fluent do not work correctly.
 * As a result, any foreground or background color other than the default results in wildly misaligned colors.
 * See here for defaults: https://github.com/microsoft/fluentui/blob/master/packages/react/src/components/ThemeGenerator/ThemeRulesStandard.ts
 * Even updating the default foreground color to itself so the slot rules re-run results in incorrect shades.
 * Below is a mapping of thematic's (basically chroma-js) darker/lighter to achieve the same core theme colors for the foreground/background.
 * We then use these hard-coded values for any updated inputs, and it looks pretty reasonable (we confirm with a Euclidean distance function that is below 3 for all in RGB space).
 * There is no invert equivalent in Fluent, so the values used are intended to create similar relative scaling.
 * The sample dark theme was used as an input model: https://github.com/microsoft/fluentui/blob/789a3733b128569190319fce3fe2b46900b24896/packages/theme-samples/src/DarkCustomizations/DarkCustomizations.ts
 * See the tests for more details.
 */
const foreground = {
	default: {
		darken: {
			neutralDark: 0.48,
		},
		lighten: {
			neutralPrimaryAlt: 0.23,
			neutralSecondary: 1.1,
			neutralTertiary: 2.515,
		},
	},
	invert: {
		darken: {
			neutralPrimaryAlt: 0.86,
			neutralSecondary: 1.66,
			neutralTertiary: 2.53,
		},
		lighten: {
			neutralDark: 0.14,
		},
	},
}

const background = {
	default: {
		darken: {
			neutralTertiaryAlt: 1.12,
			neutralQuaternary: 0.91,
			neutralQuaternaryAlt: 0.62,
			neutralLight: 0.39,
			neutralLighter: 0.23,
			neutralLighterAlt: 0.1,
		},
	},
	invert: {
		lighten: {
			neutralTertiaryAlt: 1.147,
			neutralQuaternary: 0.836,
			neutralQuaternaryAlt: 0.62,
			neutralLight: 0.384,
			neutralLighter: 0.274,
			neutralLighterAlt: 0.132,
		},
	},
}

const applyDarken = (color: string, mapping: Record<string, number>) => {
	return Object.entries(mapping).reduce((acc, cur) => {
		const [key, value] = cur
		acc[key] = darken(color, value)
		return acc
	}, {})
}

const applyLighten = (color: string, mapping: Record<string, number>) => {
	return Object.entries(mapping).reduce((acc, cur) => {
		const [key, value] = cur
		acc[key] = lighten(color, value)
		return acc
	}, {})
}

/**
 * This applies some theme shade corrections by lightening and darkening various colors.
 * @param fluentJson
 * @param inverted
 * @returns
 */
export const correctShades = (
	fluentJson: Record<string, string>,
	inverted = false,
): Record<string, string> => {
	const { foregroundColor, backgroundColor } = fluentJson
	if (inverted) {
		return {
			...fluentJson,
			...applyDarken(foregroundColor, foreground.invert.darken),
			...applyLighten(foregroundColor, foreground.invert.lighten),
			...applyLighten(backgroundColor, background.invert.lighten),
			black: '#ffffff',
			white: backgroundColor,
		}
	} else {
		return {
			...fluentJson,
			...applyDarken(foregroundColor, foreground.default.darken),
			...applyLighten(foregroundColor, foreground.default.lighten),
			...applyDarken(backgroundColor, background.default.darken),
			black: '#000000',
			white: backgroundColor,
		}
	}
}
