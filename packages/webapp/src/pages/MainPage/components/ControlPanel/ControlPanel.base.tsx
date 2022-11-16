/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './ControlPanel.css'

import { EnumDropdown } from '@essex/components'
import type { IDropdownOption, ISelectableOption } from '@fluentui/react'
import { Dropdown, Position, SpinButton, Toggle } from '@fluentui/react'
import { colorBlindnessInfo, ColorBlindnessMode } from '@thematic/color'
import type { ThemeListing } from '@thematic/core'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'

export interface ControlPanelProps {
	themes: ThemeListing[]
	themeInfo: ThemeListing
	scaleItemCount: number
	colorBlindnessMode: ColorBlindnessMode
	darkMode: boolean
	onThemeChange: (t: ThemeListing) => void
	onScaleItemCountChange: (value: number) => void
	onColorBlindnessModeChange: (mode: ColorBlindnessMode) => void
	onDarkModeChange: (d: boolean) => void
}

const SCALE_MIN = 1
const SCALE_MAX = 1000

export const ControlPanel: FC<ControlPanelProps> = ({
	themes,
	themeInfo,
	scaleItemCount,
	colorBlindnessMode,
	darkMode,
	onThemeChange,
	onScaleItemCountChange,
	onColorBlindnessModeChange,
	onDarkModeChange,
}) => {
	const handleThemeChange = useCallback(
		(_event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
			if (option) {
				const found = themes.find(t => t.id === option.key)
				if (found) {
					onThemeChange(found)
				}
			}
		},
		[themes, onThemeChange],
	)

	const handleDarkChange = useCallback(() => {
		onDarkModeChange(!darkMode)
	}, [darkMode, onDarkModeChange])

	const changeValue = useCallback(
		(value: string, change = 0) => {
			const num = parseInt(value, 10)
			if (!isNaN(num)) {
				const updated = num + (change as number)
				if (updated >= SCALE_MIN && updated <= SCALE_MAX) {
					onScaleItemCountChange(updated)
				}
			}
		},
		[onScaleItemCountChange],
	)
	const handleScaleValidate = useCallback(
		(v: string) => changeValue(v),
		[changeValue],
	)
	const handleScaleIncrement = useCallback(
		(v: string) => {
			changeValue(v, 1)
		},
		[changeValue],
	)
	const handleScaleDecrement = useCallback(
		(v: string) => changeValue(v, -1),
		[changeValue],
	)

	const handleColorBlindnessChange = useCallback(
		(_event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) =>
			onColorBlindnessModeChange(option?.key as ColorBlindnessMode),
		[onColorBlindnessModeChange],
	)

	const cbInfo = useMemo(
		() => colorBlindnessInfo(colorBlindnessMode),
		[colorBlindnessMode],
	)
	const renderDropdownOption = useCallback(
		(option: ISelectableOption | undefined) => {
			return option ? (
				<div
					style={{
						borderLeft: `8px solid ${option.data.accent as string}`,
						paddingLeft: 8,
					}}
				>
					{option.text}
				</div>
			) : null
		},
		[],
	)
	const options = useMemo(
		() =>
			themes.map(t => ({
				key: t.id,
				text: t.name,
				data: t,
			})),
		[themes],
	)
	return (
		<div className="control-wrapper">
			<h1>thematic</h1>
			<div className="controls">
				<div className="control">
					<Dropdown
						label="Theme"
						selectedKey={themeInfo.id}
						onChange={handleThemeChange}
						options={options}
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
					<Toggle
						label="Dark mode"
						checked={darkMode}
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
				<div className="control">
					<EnumDropdown
						enumeration={ColorBlindnessMode}
						label="Color blindness test"
						selectedKey={colorBlindnessMode}
						onChange={handleColorBlindnessChange}
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
