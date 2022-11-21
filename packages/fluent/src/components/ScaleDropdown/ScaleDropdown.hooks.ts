/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Size } from '@essex/components'
import { useDropdownProps } from '@essex/components'
import type { IDropdownOption, IDropdownProps } from '@fluentui/react'
import type {
	ContinuousColorScaleFunction,
	NominalColorScaleFunction,
} from '@thematic/core'
import { chooseScale } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { useSize } from 'ahooks'
import merge from 'lodash-es/merge.js'
import type React from 'react'
import { useMemo } from 'react'

import type { ChipsProps } from './ScaleDropdown.types.js'
import { selectColorPalette } from './ScaleDropdown.utils.js'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 32

const ITEM_LEFT_PADDING = 8 // default right padding in fluent item
const CARET_PADDING = 28 // defined default in fluent dropdown is 28 (this also aligns with item right padding)
export const TEXT_WIDTH = 80 // TODO: adjust this based on font size/max measured
const LABEL_HEIGHT = 29 // defined default in fluent dropdown

// we may want this to be an optional prop once extracted
// visually we'll keep it lowercase in this app for visual consistency
const TITLE_CASE = false

export function useStyledProps(
	props: Partial<IDropdownProps>,
	size: Size = 'medium',
): Partial<IDropdownProps> {
	const styledProps = useMemo(
		() =>
			merge(
				{
					styles: {
						root: {
							textAlign: 'left',
						},
					},
				},
				props,
			),
		[props],
	)
	const _props = useDropdownProps(styledProps, size)
	// FIXME: this is to correct a missing prop in the toolkit dropdown styles
	return useMemo(
		() =>
			merge(_props, {
				styles: {
					dropdownItemSelected: (_props?.styles as any).dropdownItem,
				},
			}),
		[_props],
	)
}

export function usePaletteWidth(width: number): number {
	// subtract space for the caret, pad, text, etc.
	return width - ITEM_LEFT_PADDING - TEXT_WIDTH - CARET_PADDING
}

export function usePaletteHeight(height: number, label?: string): number {
	// the measured component dimensions will include the label if present
	const root = label ? height - LABEL_HEIGHT : height
	return root / 2
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
			paddingLeft: 0,
			paddingRight: CARET_PADDING,
		}),
		[width],
	)
}

// TODO: it would be helpful to provide a filter function so scales can be
// constrained to categorical or sequential when data is string versus numeric
export function useThematicScaleOptions(): IDropdownOption[] {
	const theme = useThematic()
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
	const theme = useThematic()
	const scale = useMemo(
		() => chooseScale(theme, key, width),
		[theme, key, width],
	)
	return scale
}

export function usePaletteComponent(key: string): React.FC<ChipsProps> {
	return useMemo(() => selectColorPalette(key), [key])
}

export interface Dimensions {
	width: number
	height: number
}

export function useSafeDimensions(
	ref: React.RefObject<HTMLDivElement>,
): Dimensions {
	const dimensions = useSize(ref)
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
