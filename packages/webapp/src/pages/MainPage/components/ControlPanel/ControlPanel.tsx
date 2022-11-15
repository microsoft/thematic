/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	useColorBlindnessMode,
	useDarkMode,
	useScaleItemCount,
	useSetTheme,
	useThemeInfo,
	useThemes,
} from '../../../../state/index.js'
import { ControlPanel as ControlPanelBase } from './ControlPanel.base.js'

export const ControlPanel = () => {
	const [scaleItemCount, setScaleItemCount] = useScaleItemCount()
	const [colorBlindnessMode, setColorBlindnessMode] = useColorBlindnessMode()
	const [darkMode, setDarkMode] = useDarkMode()
	const [themes] = useThemes()
	const [themeInfo, setThemeInfo] = useThemeInfo()
	const setTheme = useSetTheme()
	return (
		<ControlPanelBase
			scaleItemCount={scaleItemCount}
			onScaleItemCountChange={setScaleItemCount}
			colorBlindnessMode={colorBlindnessMode}
			onColorBlindnessModeChange={setColorBlindnessMode}
			darkMode={darkMode}
			onDarkModeChange={setDarkMode}
			themes={themes}
			themeInfo={themeInfo}
			onThemeChange={setThemeInfo}
			onThemeLoaded={setTheme}
		/>
	)
}
