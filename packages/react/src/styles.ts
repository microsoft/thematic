/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { css2css } from '@thematic/color'
import type { Application, SVGMark } from '@thematic/core'
import type { CSSProperties } from 'react'

/**
 * Converts a basic mark config to CSS-compatible object
 * suitable for merging with other styles that will be added to a component.
 * The main function here really is to convert fill and stroke colors to use the opacity def.
 * Note that we return the style attrs as using the deconstructed form, not the CSS shorthand.
 * @param config - the mark configuration
 * @param datum - optional data item if the theme has been configured with underlying scales.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function mark2style(config: SVGMark, datum?: any): CSSProperties {
	return {
		backgroundColor: css2css(
			config.fill(datum).hex(),
			config.fillOpacity(datum),
		),
		borderStyle: 'solid', //TODO: thematic should support this...
		borderWidth: config.strokeWidth(datum),
		borderColor: css2css(
			config.stroke(datum).hex(),
			config.strokeOpacity(datum),
		),
	}
}

/**
 * Converts basic Application config to a CSS-compatible object
 * suitable for merging with other styles that will be added to a component.
 * @param config - the application configuration
 */
export function application2style(config: Application): CSSProperties {
	return {
		backgroundColor: config.background().hex(),
		color: config.foreground().hex(),
	}
}
