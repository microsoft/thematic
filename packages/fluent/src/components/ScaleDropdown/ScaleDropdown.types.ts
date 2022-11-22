/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Size } from '@essex/components'
import type { IDropdownOption, IDropdownProps } from '@fluentui/react'
import type {
	ContinuousColorScaleFunction,
	NominalColorScaleFunction,
} from '@thematic/core'

export interface ScaleDropdownProps extends Omit<IDropdownProps, 'options'> {
	/**
	 * If a data type is catgorical only (e.g., strings), filter to only include the nomincal scales.
	 * Likewise, if the data is numeric in nature, filter to only include categorical scales.
	 */
	type?: 'nominal' | 'continuous'
	size?: Size
}

export interface ScaleDropdownOptionProps {
	option: IDropdownOption
	paletteWidth: number
	paletteHeight: number
	style?: React.CSSProperties
	size?: Size
}

export interface ChipsProps {
	scale: ContinuousColorScaleFunction | NominalColorScaleFunction
	width?: number
	height?: number
	maxItems?: number
}
