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
	Normal = 'normal',
	/**
	 * The mark is hovered by the mouse.
	 */
	Hovered = 'hovered',
	/**
	 * The mark is in a selected state.
	 */
	Selected = 'selected',
	/**
	 * The mark is suppressed, such as when another mark is being strongly emphasized.
	 */
	Suppressed = 'suppressed',
	/**
	 * The mark is hidden entirely.
	 */
	Hidden = 'hidden',
	/**
	 * The mark represents a 'no data' value.
	 */
	NoData = 'nodata',
}

export enum ThemeVariant {
	Light = 'light',
	Dark = 'dark',
}

export type MarkType =
	| 'rect'
	| 'area'
	| 'circle'
	| 'process'
	| 'node'
	| 'line'
	| 'rule'
	| 'flow'
	| 'link'
	| 'arc'
	| 'text'
export type ChromeType =
	| 'plotArea'
	| 'tooltip'
	| 'axisLine'
	| 'axisTicks'
	| 'gridLines'
	| 'axisTickLabels'
	| 'axisTitle'
export type ThemeElementType = MarkType | ChromeType
