/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export * from './chroma.js'
export * from './Color.js'
export * from './colorBlindness.js'
export * from './interfaces.js'
export * from './scheme.js'

// TODO: best would be to update the scheme compute to accept undefined or baseline params and handle an "empty" case, which is maybe grayscale
export const defaultParams = {
	accentHue: 252,
	accentSaturation: 89,
	accentLuminance: 50,
	backgroundHueShift: 50,
	backgroundLevel: 95,
	nominalHueStep: 10,
}
