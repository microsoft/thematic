/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Dropdown,
	IDropdownOption,
	Toggle,
	SpinButton,
	Position,
} from '@fluentui/react'
import React, { useState, useCallback } from 'react'
import { EnumDropdown } from '../EnumDropdown'
import { ColorBlindnessMode, colorBlindnessInfo } from '@thematic/color'
import { ThemeListing, Theme } from '@thematic/core'
import { ColorPickerButton } from '@thematic/fluent'

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

const SCALE_MIN = 1
const SCALE_MAX = 1000

export const ControlPanel: React.FC<ControlPanelProps> = ({
	themes,
	themeInfo,
	chartSize,
	drawNodes,
	drawLinks,
	scaleItemCount,
	colorBlindnessMode,
	onThemeLoaded,
	onThemeChange,
	onThemeVariantToggled,
	onChartSizeChange,
	onDrawNodesChange,
	onDrawLinksChange,
	onScaleItemCountChange,
	onColorBlindnessModeChange,
}) => {
	const handleThemeChange = (e: any, v: IDropdownOption | undefined) => {
		if (v) {
			const found = themes.find(t => t.id === v!.key)
			if (found) {
				onThemeChange(found)
			}
		}
	}
	const handleChartIncrement = useCallback(
		() => onChartSizeChange(chartSize + 100),
		[onChartSizeChange, chartSize],
	)
	const handleChartDecrement = useCallback(
		() => onChartSizeChange(chartSize - 100),
		[onChartSizeChange, chartSize],
	)
	const handleChartValidate = useCallback(
		(v: string) => {
			const num = parseInt(v, 10)
			if (!isNaN(num) && num >= 100) {
				onChartSizeChange(num)
			}
		},
		[onChartSizeChange],
	)

	const handleDarkChange = (e: any, v) => {
		setDark(!dark)
		onThemeVariantToggled()
	}
	const handleDrawNodesChange = (e: any, v) => onDrawNodesChange(v)
	const handleDrawLinksChange = (e: any, v) => onDrawLinksChange(v)
	const changeValue = useCallback(
		(value: string, change = 0) => {
			const num = parseInt(value, 10)
			if (!isNaN(num)) {
				const updated = num + change
				if (updated >= SCALE_MIN && updated <= SCALE_MAX) {
					onScaleItemCountChange(updated)
				}
			}
		},
		[onScaleItemCountChange],
	)
	const handleScaleValidate = useCallback((v: string) => changeValue(v), [
		changeValue,
	])
	const handleScaleIncrement = useCallback(
		v => {
			changeValue(v, 1)
		},
		[changeValue],
	)
	const handleScaleDecrement = useCallback(v => changeValue(v, -1), [
		changeValue,
	])

	const handleColorBlindnessChange = (e: ColorBlindnessMode) => {
		onColorBlindnessModeChange(e)
	}
	const [dark, setDark] = useState(false)
	const cbInfo = colorBlindnessInfo(colorBlindnessMode)
	const renderDropdownOption = useCallback(option => {
		return (
			<div
				style={{
					borderLeft: `8px solid ${option.data.accent}`,
					paddingLeft: 8,
				}}
			>
				{option.text}
			</div>
		)
	}, [])
	return (
		<div className="control-wrapper">
			<h1>thematic</h1>
			<div className="controls">
				<div className="control">
					<Dropdown
						label="Theme"
						selectedKey={themeInfo.id}
						onChange={handleThemeChange}
						options={themes.map(t => ({
							key: t.id,
							text: t.name,
							data: t,
						}))}
						onRenderOption={renderDropdownOption}
						styles={{
							root: {
								display: 'flex',
								flexDirection: 'column',
							},
						}}
					/>
				</div>
				<div className="control">
					<ColorPickerButton label="Accent" onChange={onThemeLoaded} />
				</div>
				<div className="control">
					<Toggle
						label="Dark mode"
						checked={dark}
						onChange={handleDarkChange}
					/>
				</div>
				<div className="control spinner">
					<SpinButton
						label="Scale items"
						labelPosition={Position.top}
						value={scaleItemCount.toString()}
						min={SCALE_MIN}
						max={SCALE_MAX}
						step={1}
						onIncrement={handleScaleIncrement}
						onDecrement={handleScaleDecrement}
						onValidate={handleScaleValidate}
						incrementButtonAriaLabel={'Increase value by 1'}
						decrementButtonAriaLabel={'Decrease value by 1'}
					/>
				</div>
				<div className="control spinner">
					<SpinButton
						label="Chart size"
						labelPosition={Position.top}
						value={chartSize.toString()}
						min={100}
						max={2000}
						step={100}
						onIncrement={handleChartIncrement}
						onDecrement={handleChartDecrement}
						onValidate={handleChartValidate}
						incrementButtonAriaLabel={'Increase value by 1'}
						decrementButtonAriaLabel={'Decrease value by 1'}
					/>
				</div>
				<div className="control">
					<Toggle
						label="Draw nodes"
						checked={drawNodes}
						onChange={handleDrawNodesChange}
					/>
				</div>
				<div className="control">
					<Toggle
						label="Draw links"
						checked={drawLinks}
						onChange={handleDrawLinksChange}
					/>
				</div>
				<div className="control">
					<EnumDropdown<ColorBlindnessMode>
						enumeration={ColorBlindnessMode}
						label="Color blindness"
						selected={colorBlindnessMode}
						onChange={handleColorBlindnessChange as any}
						styles={{
							root: {
								display: 'flex',
								flexDirection: 'column',
								width: 150,
							},
						}}
					/>
					{colorBlindnessMode !== ColorBlindnessMode.None && (
						<div className="cb-info">
							{`${cbInfo.description}. Affecting ${
								cbInfo.incidence < 0.01
									? '<1'
									: `~${Math.round(cbInfo.incidence * 100)}`
							}% of males.`}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
