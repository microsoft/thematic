/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColorPickerProps } from '@fluentui/react'
import type { SchemeParams } from '@thematic/color'

export interface ColorPickerProps
	extends Omit<IColorPickerProps, 'color' | 'onChange'> {
	onChange?: (params: SchemeParams) => void
}
