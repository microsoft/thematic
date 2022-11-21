/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Size } from '@essex/components'
import type { IColorPickerProps } from '@fluentui/react'
import type { SchemeParams } from '@thematic/color'

export interface ColorPickerProps
	extends Omit<IColorPickerProps, 'color' | 'onChange'> {
	size?: Size
	onChange?: (params: SchemeParams) => void
}
