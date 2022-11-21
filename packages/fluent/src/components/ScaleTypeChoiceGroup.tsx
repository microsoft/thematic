/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ChoiceGroup } from '@fluentui/react'
import type { FC } from 'react'

import { useStyledProps, useTypeOptions } from './ScaleTypeChoiceGroup.hooks.js'
import type { ScaleTypeChoiceGroupProps } from './ScaleTypeChoiceGroup.types.js'

/**
 * Represents a strongly typed ChoiceGroup for selecting thematic ScaleTypes.
 */
export const ScaleTypeChoiceGroup: FC<ScaleTypeChoiceGroupProps> = ({
	size,
	suppressQuantile = false,
	...props
}) => {
	const options = useTypeOptions(suppressQuantile)
	const _props = useStyledProps(props, options, size)
	return <ChoiceGroup {..._props} />
}
