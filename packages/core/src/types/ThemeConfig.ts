/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ColorBlindnessMode } from '@thematic/color'

import type { ThemeDefinition } from './ThemeDefinition.js'

export interface ThemeConfig {
	/**
	 * Set the color variant of the theme using one of the supported enum values.
	 * If none supplied, loads the light version.
	 */
	dark?: boolean
	/**
	 * Set the simulated color blindness mode to use for this theme instance.
	 */
	colorBlindnessMode?: ColorBlindnessMode
	/**
	 * This is override config for the theme. If you are using a theme but want specific properties set
	 * for various mark types, you can config it here and continue to use the Theme getters.
	 */
	overrides?: ThemeDefinition
}
