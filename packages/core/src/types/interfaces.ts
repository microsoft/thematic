/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export enum ScaleType {
	/**
	 * Maps using a linear transform.
	 */
	Linear = 'linear',
	/**
	 * Maps with a log transform. Useful for wide data ranges, but cannot handle 0 values.
	 */
	Log = 'log',
	/**
	 * This creates a set of quantile bins to partition the data into, with an aim for equal size bins to smooth out the scale.
	 */
	Quantile = 'quantile',
}

/**
 * Selection state for a visual mark.
 */
export enum SelectionState {
	/**
	 * Normal representation of a mark.
	 */
	Normal,
	/**
	 * The mark is hovered by the mouse.
	 */
	Hovered,
	/**
	 * The mark is in a selected state.
	 */
	Selected,
	/**
	 * The mark is suppressed, such as when another mark is being strongly emphasized.
	 */
	Suppressed,
	/**
	 * The mark is hidden entirely.
	 */
	Hidden,
	/**
	 * The mark represents a 'no data' value.
	 */
	NoData,
}

export enum ThemeVariant {
	Light = 'light',
	Dark = 'dark',
}
