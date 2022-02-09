/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	useDarkMode,
	useThemeInfo,
	useThemes,
	useSetTheme,
	useChartSize,
	useColorBlindnessMode,
	useDrawLinks,
	useDrawNodes,
	useScaleItemCount,
} from '../../state'
import { ControlPanel as ControlPanelComponent } from './ControlPanel'

export const ControlPanel = () => {
	const [drawNodes, setDrawNodes] = useDrawNodes()
	const [drawLinks, setDrawLinks] = useDrawLinks()
	const [chartSize, setChartSize] = useChartSize()
	const [scaleItemCount, setScaleItemCount] = useScaleItemCount()
	const [colorBlindnessMode, setColorBlindnessMode] = useColorBlindnessMode()
	const [darkMode, setDarkMode] = useDarkMode()
	const [themes] = useThemes()
	const [themeInfo, setThemeInfo] = useThemeInfo()
	const setTheme = useSetTheme()
	return (
		<ControlPanelComponent
			drawNodes={drawNodes}
			onDrawNodesChange={setDrawNodes}
			drawLinks={drawLinks}
			onDrawLinksChange={setDrawLinks}
			chartSize={chartSize}
			onChartSizeChange={setChartSize}
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
