/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme, ScaleType, SelectionState } from '@thematic/core'
import { Selection } from 'd3-selection'

/**
 * Creates a d3-compatible nominal scale using the theme.
 * Returns a function that takes a key and returns an appropriate color.
 * @param theme
 * @param size
 */
export function nominal(theme: Theme, size: number): (key: any) => string {
	const scale = theme.scales().nominal(size)
	return (key: any): string => scale(key).hex()
}

/**
 * Creates a d3-compatible nominal (bold) scale using the theme.
 * Returns a function that takes a key and returns an appropriate color.
 * @param theme
 * @param size
 */
export function nominalBold(theme: Theme, size: number): (key: any) => string {
	const scale = theme.scales().nominalBold(size)
	return (key: any): string => scale(key).hex()
}

/**
 * Creates a d3-compatible nominal (muted) scale using the theme.
 * Returns a function that takes a key and returns an appropriate color.
 * @param theme
 * @param size
 */
export function nominalMuted(theme: Theme, size: number): (key: any) => string {
	const scale = theme.scales().nominalMuted(size)
	return (key: any): string => scale(key).hex()
}

/**
 * Creates a d3-compatible sequential scale using the theme.
 * Returns a function that takes a number and returns an appropriate color.
 * @param theme
 * @param domain
 * @param scaleType
 * @param quantiles
 */
export function sequential(
	theme: Theme,
	domain: number[],
	scaleType?: ScaleType,
	quantiles?: number,
): (value: number) => string {
	const scale = theme.scales().sequential(domain, scaleType, quantiles)
	return (value: number): string => scale(value).hex()
}

/**
 * Creates a d3-compatible sequential (variant 2) scale using the theme.
 * Returns a function that takes a number and returns an appropriate color.
 * @param theme
 * @param domain
 * @param scaleType
 * @param quantiles
 */
export function sequential2(
	theme: Theme,
	domain: number[],
	scaleType?: ScaleType,
	quantiles?: number,
): (value: number) => string {
	const scale = theme.scales().sequential2(domain, scaleType, quantiles)
	return (value: number): string => scale(value).hex()
}

/**
 * Creates a d3-compatible divering scale using the theme.
 * Returns a function that takes a number and returns an appropriate color.
 * @param theme
 * @param domain
 * @param scaleType
 * @param quantiles
 */
export function diverging(
	theme: Theme,
	domain: number[],
	scaleType?: ScaleType,
	quantiles?: number,
): (value: number) => string {
	const scale = theme.scales().diverging(domain, scaleType, quantiles)
	return (value: number): string => scale(value).hex()
}

/**
 * Creates a d3-compatible divering (variant 2) scale using the theme.
 * Returns a function that takes a number and returns an appropriate color.
 * @param theme
 * @param domain
 * @param scaleType
 * @param quantiles
 */
export function diverging2(
	theme: Theme,
	domain: number[],
	scaleType?: ScaleType,
	quantiles?: number,
): (value: number) => string {
	const scale = theme.scales().diverging2(domain, scaleType, quantiles)
	return (value: number): string => scale(value).hex()
}

/**
 * Creates a d3-compatible sequential (greys) scale using the theme.
 * Returns a function that takes a number and returns an appropriate color.
 * @param theme
 * @param domain
 * @param scaleType
 * @param quantiles
 */
export function greys(
	theme: Theme,
	domain: number[],
	scaleType?: ScaleType,
	quantiles?: number,
): (value: number) => string {
	const scale = theme.scales().greys(domain, scaleType, quantiles)
	return (value: number): string => scale(value).hex()
}

// TODO: this sort of logic should be baked into the core theme,
// otherwise we'll have to replicate everywhere that needs the state modulations
export function applyNominalAttrWithSignalState(
	selection: Selection<Element, any, Element, any>,
	attr: string,
	getState: (datum: any) => SelectionState,
	accessor: (datum: any) => any,
	theme: Theme,
	size: number,
): void {
	const normal = theme.scales().nominal(size)
	const muted = theme.scales().nominalMuted(size)
	const bold = theme.scales().nominalBold(size)
	selection.attr(attr, d => {
		const selectionState = getState(d)
		const key = accessor(d)
		switch (selectionState) {
			case SelectionState.Normal:
				return normal(key).hex()
			case SelectionState.Hovered:
				return bold(key).hex()
			case SelectionState.Selected:
				return bold(key).hex()
			case SelectionState.Suppressed:
				return muted(key).hex()
		}
	})
}
