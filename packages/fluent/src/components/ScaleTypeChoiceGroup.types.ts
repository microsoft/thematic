/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IChoiceGroupProps } from '@fluentui/react'

export interface ScaleTypeChoiceGroupProps
	extends Omit<IChoiceGroupProps, 'size'> {
	size?: 'small' | 'medium'
	suppressQuantile?: boolean
}
