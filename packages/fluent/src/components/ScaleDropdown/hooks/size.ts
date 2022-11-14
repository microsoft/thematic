/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useSize } from 'ahooks';

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 32;

export interface Dimensions {
	width: number;
	height: number;
}

export function useSafeDimensions(ref: React.RefObject<HTMLDivElement>): Dimensions {
	const dimensions = useSize(ref);
	return (
		dimensions || {
			width: DEFAULT_WIDTH,
			height: DEFAULT_HEIGHT,
		}
	);
}

/**
 * Retrieve a non-zero width/height, because collapsible panels can force invalid color arrays
 * @param width
 * @param height
 */
export function useSafeCollapseDimensions(width: number, height: number): [number, number] {
	return [width <= 0 ? 1 : width, height <= 0 ? 1 : height];
}
