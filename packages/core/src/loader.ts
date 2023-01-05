/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { hsluv2hex } from '@thematic/color'

import { Theme as ThemeImpl } from './Theme.js'
import autumn from './themes/autumn.js'
import defaultTheme from './themes/default.js'
import metal from './themes/metal.js'
import ocean from './themes/ocean.js'
import type {
	Theme,
	ThemeConfig,
	ThemeListing,
	ThemeSpec,
} from './types/index.js'

const themes = {
	default: defaultTheme,
	autumn,
	ocean,
	metal,
}

/**
 * This is a list of the built-in themes.
 * These can be loaded using the loadById function.
 */
export const defaultThemes: ThemeListing[] = Object.entries(themes).map(
	(entry) => {
		const [key, value] = entry
		const { accentHue, accentSaturation, accentLightness } = value.params
		return {
			id: key,
			name: value.name,
			accent: hsluv2hex([accentHue, accentSaturation, accentLightness]),
		}
	},
)

/**
 * Load the default theme
 * Use config to supply overrides to specific definition blocks
 * @param config - the theme configuration
 */
export function load(config?: ThemeConfig): Theme {
	return new ThemeImpl(themes['default'], config)
}

/**
 * Load one of the default themes by id.
 * Use config to supply overrides to specific definition blocks
 *
 * @param id - the theme id
 * @param config - the theme configuration
 */
export function loadById(id: string, config?: ThemeConfig): Theme {
	return new ThemeImpl((themes as any)[id], config)
}

/**
 * Load a new theme directly from a ThemeSpec object
 * @param spec - the theme specificationw
 * @param config - the theme configuration
 */
export function loadFromSpec(spec: ThemeSpec, config?: ThemeConfig): Theme {
	return new ThemeImpl(spec, config)
}

/**
 * Themes are read-only, this lets us create a new theme by overlaying new properties onto a previous one
 * @param theme - the theme
 * @param updatedSpec - ThemeSpec with new values where needed
 * @param updatedConfig - ThemeConfig with new values where needed
 */
export function clone(
	theme: Theme,
	updatedSpec?: ThemeSpec,
	updatedConfig?: ThemeConfig,
): Theme {
	return theme.clone(updatedSpec!, updatedConfig)
}
