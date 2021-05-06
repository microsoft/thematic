/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dimensions, useDimensions } from '@essex-js-toolkit/hooks'
import React from 'react'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 32
export function useSafeDimensions(
	ref: React.RefObject<HTMLDivElement>,
): Dimensions {
	const dimensions = useDimensions(ref)
	return (
		dimensions || {
			width: DEFAULT_WIDTH,
			height: DEFAULT_HEIGHT,
		}
	)
}

/**
 * Retrieve a non-zero width/height, because collapsible panels can force invalid color arrays
 * @param width
 * @param height
 */
export function useSafeCollapseDimensions(
	width: number,
	height: number,
): [number, number] {
	return [width <= 0 ? 1 : width, height <= 0 ? 1 : height]
}
