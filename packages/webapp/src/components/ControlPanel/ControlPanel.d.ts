import { ColorBlindnessMode } from '@thematic/color'
import { ThemeListing, Theme } from '@thematic/core'
import { FC } from 'react'
import './index.css'
export interface ControlPanelProps {
	themes: ThemeListing[]
	themeInfo: ThemeListing
	chartSize: number
	drawNodes: boolean
	drawLinks: boolean
	scaleItemCount: number
	colorBlindnessMode: ColorBlindnessMode
	onThemeLoaded: (theme: Theme) => void
	onThemeChange: (t: ThemeListing) => void
	onThemeVariantToggled: () => void
	onChartSizeChange: (n: number) => void
	onDrawNodesChange: (d: boolean) => void
	onDrawLinksChange: (d: boolean) => void
	onScaleItemCountChange: (value: number) => void
	onColorBlindnessModeChange: (mode: ColorBlindnessMode) => void
}
export declare const ControlPanel: FC<ControlPanelProps>
