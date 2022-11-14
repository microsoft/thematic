/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export * from './chroma.js'
export * from './Color.js'
export * from './colorBlindness.js'
export * from './nearest.js'
export * from './scheme.js'
export * from './types.js'

/**
 * Default set of params useful for initializing new themes with our "standard look".
 */
export const defaultParams = {
	accentHue: 252,
	accentSaturation: 89,
	accentLightness: 50,
	backgroundHueShift: 50,
	backgroundLevel: 95,
	nominalHueStep: 10,
}
