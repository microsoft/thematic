/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	css2css,
	css2hex,
	css2hsl,
	css2hsluv,
	css2rgba,
	css2rgbaint,
	css2rgbav,
} from './chroma.js'
import type { Hsl, HslVector, RGBAV, Rgba } from './types.js'

/**
 * This class represents an instance of a color.
 * You create it by passing in a standard CSS-compatible string and an optional alpha value.
 * Note that some CSS color formats can include alpha, we do this because SVG colors allow separate
 * specification of color and alpha.
 *
 * This class also contains various accessors that transform the color output as noted.
 * Note that the naming of these intentionally matches the string values on the ColorSpace enum.
 */
export class Color {
	private _raw: string
	private _alpha: number
	constructor(css: string, alpha?: number) {
		this._raw = css
		this._alpha = alpha !== undefined ? alpha : 1.0
	}
	/**
	 * Direct passthrough of string used to create the color, to avoid any transform.
	 */
	get raw(): string {
		return this._raw
	}
	hex(alpha?: number): string {
		return css2hex(this._raw, alpha || this._alpha)
	}
	css(alpha?: number): string {
		return css2css(this._raw, alpha || this._alpha)
	}
	rgbav(alpha?: number): RGBAV {
		return css2rgbav(this._raw, alpha || this._alpha)
	}
	rgbaint(alpha?: number): number {
		return css2rgbaint(this._raw, alpha || this._alpha)
	}
	rgba(alpha?: number): Rgba {
		return css2rgba(this._raw, alpha)
	}
	hsluv(): HslVector {
		return css2hsluv(this._raw)
	}
	hsl(): Hsl {
		return css2hsl(this._raw)
	}
	toString(): string {
		return this.hex()
	}
}
