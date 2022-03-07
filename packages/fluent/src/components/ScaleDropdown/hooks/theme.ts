/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IDropdownOption } from '@fluentui/react'
import type {
	NominalColorScaleFunction,
	ContinuousColorScaleFunction,
} from '@thematic/core'
import type React from 'react'
import { useMemo } from 'react'
import { useThematicFluent } from '../../../provider/index.js'
import type { ChipsProps } from '../types.js'
import { chooseScale, selectColorPalette } from '../util.js'

const ITEM_LEFT_PADDING = 8 // default right padding in fluent item
const ITEM_BORDER_MODIFIER = 1 // accounts for transparent border on outer container
const CARET_PADDING = 28 // defined default in fluent dropdown is 28 (this also aligns with item right padding)
export const TEXT_WIDTH = 80 // TODO: adjust this based on font size/max measured
const LABEL_HEIGHT = 29 // defined default in fluent dropdown

// we may want this to be an optional prop once extracted
// visually we'll keep it lowercase in this app for visual consistency
const TITLE_CASE = false

export function usePaletteWidth(width: number): number {
	// subtract space for the caret, pad, text, etc.
	return (
		width -
		ITEM_BORDER_MODIFIER -
		ITEM_LEFT_PADDING -
		TEXT_WIDTH -
		CARET_PADDING -
		ITEM_BORDER_MODIFIER
	)
}

export function usePaletteHeight(height: number, label?: string): number {
	// the measured component dimensions will include the label if present
	const root = label ? height - LABEL_HEIGHT : height
	return root / 2
}

/**
 * Provides style overrides for root dropdown container
 * @returns
 */
export function useContainerStyle(): React.CSSProperties {
	return useMemo(
		() => ({
			textAlign: 'left',
		}),
		[],
	)
}

/**
 * This provides unique style overrides for the dropdown items,
 * NOT the title. The paddings here are to align the item
 * contents visually with the title, so it has a seamless
 * appearance whether expanded or not.
 */
export function useItemStyle(width: number): React.CSSProperties {
	return useMemo(
		() => ({
			width: width - CARET_PADDING,
			paddingLeft: ITEM_BORDER_MODIFIER,
			paddingRight: CARET_PADDING,
		}),
		[width],
	)
}

// TODO: it would be helpful to provide a filter function so scales can be
// constrained to categorical or sequential when data is string versus numeric
export function useThematicScaleOptions(): IDropdownOption[] {
	const theme = useThematicFluent()
	return useMemo(() => {
		const keys = Object.keys(theme.scales())
		return keys.map(key => {
			// pretty print the scale names
			// (1) uppercase first letter
			// (2) use +/- for bold/muted
			const text = key
				.replace(/^(\w{1})/, c => (TITLE_CASE ? c.toLocaleUpperCase() : c))
				.replace('Bold', '+')
				.replace('Muted', '-')
			return {
				key,
				text,
			}
		})
	}, [theme])
}

export function useScale(
	key: string,
	width: number,
): NominalColorScaleFunction | ContinuousColorScaleFunction {
	const theme = useThematicFluent()
	const scale = useMemo(
		() => chooseScale(theme, key, width),
		[theme, key, width],
	)
	return scale
}

export function usePaletteComponent(key: string): React.FC<ChipsProps> {
	return useMemo(() => selectColorPalette(key), [key])
}
