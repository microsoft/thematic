/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './ColorPicker.css'

import type { SchemeParams } from '@thematic/color'
import type { FC } from 'react'

import { useSetParams } from '../../../../../../state/index.js'
import { ColorSelection } from './ColorSelection.js'

export interface ColorPickerProps {
	paramsChanged: (params: SchemeParams) => void
}

const ColorPickerComponent: FC<ColorPickerProps> = ({ paramsChanged }) => {
	return (
		<div>
			<ColorSelection onParamsChanged={paramsChanged} />
		</div>
	)
}

export const ColorPicker = () => {
	const paramsChanged = useSetParams()
	return <ColorPickerComponent paramsChanged={paramsChanged} />
}
