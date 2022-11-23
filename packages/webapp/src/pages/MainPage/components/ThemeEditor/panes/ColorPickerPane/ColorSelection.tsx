/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { SchemeParams } from '@thematic/color'
import { ColorPicker, ThemeParameters } from '@thematic/fluent'
import type { FC } from 'react'

export interface ColorSelectionProps {
	onParamsChanged: (params: SchemeParams) => void
}

export const ColorSelection: FC<ColorSelectionProps> = ({
	onParamsChanged,
}) => {
	return (
		<div className="color-controls-area">
			<ColorPicker onChange={onParamsChanged} />
			<ThemeParameters onChange={onParamsChanged} />
		</div>
	)
}
