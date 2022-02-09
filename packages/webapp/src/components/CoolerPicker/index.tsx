/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme } from '@thematic/core'
import { FC } from 'react'
import { useSetTheme } from '../../state'
import { ColorSelection } from './ColorSelection'
import './index.css'

export interface CoolerPickerProps {
	themeLoaded: (theme: Theme) => void
}

const CoolerPickerComponent: FC<CoolerPickerProps> = ({ themeLoaded }) => {
	return (
		<div className="cooler-picker">
			<ColorSelection onThemeLoaded={themeLoaded} />
		</div>
	)
}

export const CoolerPicker = () => {
	const themeLoaded = useSetTheme()
	return <CoolerPickerComponent themeLoaded={themeLoaded} />
}
