/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Rgb, Rgba, Hsv, Hsl } from './interfaces'

/* eslint-disable @typescript-eslint/no-var-requires */
const hsluv = require('hsluv')
const chroma = require('chroma-js')

/**
 * This is a variety of color utilities to minimize additional direct dependencies
 * that a thematic consumer might need to be aware of.
 */

/**
 * Convert a standard CSS-compatible string to [h, s, l] array
 */
export function css2hsluv(css: string): [number, number, number] {
	return hsluv.hexToHsluv(chroma(css).hex()).map((v: number) => Math.round(v))
}

export function hsluv2hex(h: number, s: number, l: number): string {
	return hsluv.hsluvToHex([h, s, l])
}

/**
 * Convert a standard CSS-compatible string to [l, c, h] array
 * @param css
 */
export function css2lch(css: string): [number, number, number] {
	return chroma(css)
		.lch()
		.map((v: number) => Math.round(v))
}

/**
 * Convert a set of l, c, and h values to a standard CSS-comptible hex string
 */
export function lch2hex(l: number, c: number, h: number): string {
	return chroma(l, c, h, 'lch').hex()
}

/**
 * Darken a standard CSS color
 * @param css
 * @param value
 */
export function darken(css: string, value?: number): string {
	return chroma(css).darken(value).hex()
}

/**
 * Lighten a standard CSS color
 * @param css
 * @param value
 */
export function lighten(css: string, value?: number): string {
	return chroma(css).brighten(value).hex()
}

/**
 * Compute the contrast between a foreground and background color
 * @param foreground
 * @param background
 */
export function contrast(foreground: string, background: string): number {
	return chroma.contrast(foreground, background)
}

/**
 * Converts a standard CSS color to an {r, g, b} object
 * @param css
 * @param alpha Included for compatibility with all of the other transformers, but it will be omitted from the returned value.
 */
export function css2rgb(css: string, alpha?: number): Rgb {
	if (css === 'none') {
		return {
			r: 0,
			g: 0,
			b: 0,
		}
	}
	const [r, g, b] = chroma(css).rgb()
	return {
		r,
		g,
		b,
	}
}

/**
 * Converts a standard CSS color to an { r, g, b, a } object.
 * @param css
 * @param alpha
 */
export function css2rgba(css: string, alpha?: number): Rgba {
	if (css === 'none') {
		return {
			r: 0,
			g: 0,
			b: 0,
			a: 0,
		}
	}
	const [r, g, b, aa] = chroma(css).rgba()
	const a = alpha !== undefined ? alpha : aa
	return {
		r,
		g,
		b,
		a,
	}
}

/**
 * Convert a standard CSS color to an { h, s, v } object.
 * @param css
 * @param alpha
 */
export function css2hsv(css: string, alpha?: number): Hsv {
	if (css === 'none') {
		return {
			h: 0,
			s: 0,
			v: 0,
		}
	}
	const [h, s, v] = chroma(css).hsv()
	return {
		h,
		s,
		v,
	}
}

/**
 * Convert a standard CSS color to an { h, s, l } object.
 * @param css
 * @param alpha
 */
export function css2hsl(css: string, alpha?: number): Hsl {
	if (css === 'none') {
		return {
			h: 0,
			s: 0,
			l: 0,
		}
	}
	const [h, s, l] = chroma(css).hsl()
	return {
		h,
		s,
		l,
	}
}

/**
 * Seems redundant...but we spec opacity separate, so this ensures SVG fill or stroke opacity
 * can be folded in as the alpha channel.
 * @param css
 * @param alpha
 */
export function css2css(css: string, alpha?: number): string {
	if (css === 'none') {
		return 'transparent'
	}
	// chroma chaining returns a new object
	const c = chroma(css)
	const ca = alpha !== undefined ? c.alpha(alpha) : c
	return ca.css()
}

/**
 * Returns a standard hex color code.
 * Note that we handle 'none' as 'none' here because it is used frequently to indicate empty fills and strokes in svg,
 * even though it is not a valid hex code.
 * Note: if you are using this for a css color, use css2css as it will return valid 'transparent' for our empty 'none'.
 * @param css
 * @param alpha
 */
export function css2hex(css: string, alpha?: number): string {
	if (css === 'none') {
		return 'none'
	}
	const c = chroma(css)
	const ca = alpha !== undefined ? c.alpha(alpha) : c
	return ca.hex()
}

/**
 * Convert a standard CSS string to vector of [r, g, b, a] values scaled from 0-1.
 * This is typically used in WebGl.
 * @param css
 * @param alpha optional alpha override from 0-1. Not all CSS strings include alpha, so you can provide it if needed.
 */
export function css2rgbaVector(
	css: string,
	alpha?: number,
): [number, number, number, number] {
	if (css === 'none') {
		return [0, 0, 0, 0]
	}
	const [r, g, b, aa] = chroma(css).rgba()
	const a = alpha !== undefined ? alpha : aa
	return [r / 255, g / 255, b / 255, a]
}

/**
 * Convert a standard CSS string to an integer number.
 * This is commonly used in GL code.
 * @param css
 * @param alpha
 */
export function css2rgbaNumber(css: string, alpha?: number): number {
	if (css === 'none') {
		return 0
	}
	const [r, g, b, aa] = chroma(css).rgba()
	const a = alpha !== undefined ? alpha : aa
	let color = 0
	color |= r
	color |= g << 8
	color |= b << 16
	color |= (a * 255) << 24
	return color
}
