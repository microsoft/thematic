/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './ColorPicker.css'

import type { Theme } from '@thematic/core'
import type { FC } from 'react'

import { useSetTheme } from '../../../../../../state'
import { ColorSelection } from './ColorSelection'

export interface ColorPickerProps {
	themeLoaded: (theme: Theme) => void
}

const ColorPickerComponent: FC<ColorPickerProps> = ({ themeLoaded }) => {
	return (
		<div>
			<ColorSelection onThemeLoaded={themeLoaded} />
		</div>
	)
}

export const ColorPicker = () => {
	const themeLoaded = useSetTheme()
	return <ColorPickerComponent themeLoaded={themeLoaded} />
}
