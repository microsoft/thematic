/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * This is the core set of parameters for generating schemes using CoolerPicker
 */
export interface Params {
	accentHue: number
	accentSaturation: number
	accentLuminance: number
	backgroundHueShift: number
	backgroundLevel: number
	nominalHueStep: number
}

/**
 * Core color properties for a computed color scheme.
 * Note the values are all strings - our color default representation uses hex codes.
 */
export interface Scheme {
	background: string
	offsetBackground: string
	foreground: string
	accent: string
	warning: string
	error: string
	faintAnnotation: string
	lowContrastAnnotation: string
	lowMidContrastAnnotation: string
	midContrastAnnotation: string
	midHighContrastAnnotation: string
	highContrastAnnotation: string
	sequential: string[]
	sequential2: string[]
	diverging: string[]
	diverging2: string[]
	nominalBold: string[]
	nominal: string[]
	nominalMuted: string[]
	greys: string[]
}

/**
 * This is an enumeration of the major known forms of color blindness.
 * They are ordered by how common they are in males of Northern European descent (by far the most affected)
 * According to https://en.wikipedia.org/wiki/Color_blindness
 */
export enum ColorBlindnessMode {
	None, // ~92%
	Deuteranomaly, // red/green, 6%, 0.4% females
	Protanomaly, // red/green, 1% males, .01% females
	Protanopia, // red/green, 1% females
	Deuteranopia, // red/green, 1% males
	Tritanopia, // blue/yellow, < 1% males and females
	Tritanomaly, // blue/yellow, .01% males and females
	Achromatopsia, // no color at all, very rare
}

/**
 * Interface for meta container about color blindness.
 * Note that incidence is the reported number for males,
 * as female color blindness is very rare in comparison
 * (overall 1 in 12 males, 1 in 200 females)
 */
export interface ColorBlindnessMeta {
	incidence: number
	description: string
}

/**
 * Various options for color transforms and representations
 */
export enum ColorSpace {
	/**
	 * Encode as a standard hexadecimal color.
	 */
	HEX = 'hex',
	/**
	 * Encode the color using any CSS-compatible color string.
	 * The default due to its wide applicability, and the format colors use in theme JSON.
	 * https://www.w3.org/TR/css-color-3/#colorunits
	 */
	CSS = 'css',
	/**
	 * Encode as an object with r, g, b properies, scaled 0-255 each.
	 */
	RGB = 'rgb',
	/**
	 * Encode as an object with r, g, b properies, scaled 0-255 each,
	 * along with an alpha prop scaled 0-1
	 */
	RGBA = 'rgba',
	/**
	 * Encode the color using a vector of floats R, G, B, and A.
	 * Range of each is 0 to 1.
	 * Color "none" will be represented as an empty array.
	 * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_shaders_to_apply_color_in_WebGL
	 */
	RGBA_VECTOR = 'rgbav',
	/**
	 * This is raw JavaScript number representing the RGBA color.
	 * It is calculated by bitshifting R, G, B, and A values into a 32-bit space.
	 * (i.e., r, g << 8, b << 16, a << 24)
	 */
	RGBA_NUMBER = 'rgbaint',
}

export interface Rgb {
	r: number
	g: number
	b: number
}

export interface Rgba extends Rgb {
	a: number
}

export interface Hsv {
	h: number
	s: number
	v: number
}

export interface Hsl {
	h: number
	s: number
	l: number
}
