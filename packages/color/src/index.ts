/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export * from './interfaces'
export * from './chroma'
export * from './colorBlindness'
export * from './Color'
export * from './scheme'

// TODO: best would be to update the scheme compute to accept undefined or baseline params and handle an "empty" case, which is maybe grayscale
export const defaultParams = {
	accentHue: 252,
	accentSaturation: 89,
	accentLuminance: 50,
	backgroundHueShift: 50,
	backgroundLevel: 95,
	nominalHueStep: 10,
}
