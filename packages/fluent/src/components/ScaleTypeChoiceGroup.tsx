/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ChoiceGroup } from '@fluentui/react'
import type { FC } from 'react'

import { useStyles, useTypeOptions } from './ScaleTypeChoiceGroup.hooks.js'
import type { ScaleTypeChoiceGroupProps } from './ScaleTypeChoiceGroup.types.js'

/**
 * Represents a strongly typed ChoiceGroup for selecting thematic ScaleTypes.
 */
export const ScaleTypeChoiceGroup: FC<ScaleTypeChoiceGroupProps> = ({
	styles,
	suppressQuantile = false,
	...props
}) => {
	const typeOptions = useTypeOptions(suppressQuantile)
	const _styles = useStyles(styles)
	return <ChoiceGroup {...props} styles={_styles} options={typeOptions} />
}
