/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Size } from '@essex/components'
import type { IButtonProps } from '@fluentui/react'
import type { SchemeParams } from '@thematic/color'

export interface ColorPickerButtonProps
	extends Omit<IButtonProps, 'onChange' | 'iconProps' | 'menuProps' | 'size'> {
	size?: Size
	onChange?: (params: SchemeParams) => void
}
