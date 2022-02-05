import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Dropdown, Toggle, SpinButton, Position } from '@fluentui/react'
import { ColorBlindnessMode, colorBlindnessInfo } from '@thematic/color'
import { ColorPickerButton } from '@thematic/fluent'
import { useState, useCallback } from 'react'
import { EnumDropdown } from '../EnumDropdown'
import './index.css'
const SCALE_MIN = 1
const SCALE_MAX = 1000
export const ControlPanel = ({
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
	const handleThemeChange = (e, v) => {
		if (v) {
			const found = themes.find(t => t.id === v.key)
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
		v => {
			const num = parseInt(v, 10)
			if (!isNaN(num) && num >= 100) {
				onChartSizeChange(num)
			}
		},
		[onChartSizeChange],
	)
	const handleDarkChange = (e, v) => {
		setDark(!dark)
		onThemeVariantToggled()
	}
	const handleDrawNodesChange = (e, v) => onDrawNodesChange(v)
	const handleDrawLinksChange = (e, v) => onDrawLinksChange(v)
	const changeValue = useCallback(
		(value, change = 0) => {
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
	const handleScaleValidate = useCallback(v => changeValue(v), [changeValue])
	const handleScaleIncrement = useCallback(
		v => {
			changeValue(v, 1)
		},
		[changeValue],
	)
	const handleScaleDecrement = useCallback(
		v => changeValue(v, -1),
		[changeValue],
	)
	const handleColorBlindnessChange = e => {
		onColorBlindnessModeChange(e)
	}
	const [dark, setDark] = useState(false)
	const cbInfo = colorBlindnessInfo(colorBlindnessMode)
	const renderDropdownOption = useCallback(option => {
		return _jsx(
			'div',
			{
				style: {
					borderLeft: `8px solid ${option.data.accent}`,
					paddingLeft: 8,
				},
				children: option.text,
			},
			void 0,
		)
	}, [])
	return _jsxs(
		'div',
		{
			className: 'control-wrapper',
			children: [
				_jsx('h1', { children: 'thematic' }, void 0),
				_jsxs(
					'div',
					{
						className: 'controls',
						children: [
							_jsx(
								'div',
								{
									className: 'control',
									children: _jsx(
										Dropdown,
										{
											label: 'Theme',
											selectedKey: themeInfo.id,
											onChange: handleThemeChange,
											options: themes.map(t => ({
												key: t.id,
												text: t.name,
												data: t,
											})),
											onRenderOption: renderDropdownOption,
											styles: {
												root: {
													display: 'flex',
													flexDirection: 'column',
												},
											},
										},
										void 0,
									),
								},
								void 0,
							),
							_jsx(
								'div',
								{
									className: 'control',
									children: _jsx(
										ColorPickerButton,
										{ label: 'Accent', onChange: onThemeLoaded },
										void 0,
									),
								},
								void 0,
							),
							_jsx(
								'div',
								{
									className: 'control',
									children: _jsx(
										Toggle,
										{
											label: 'Dark mode',
											checked: dark,
											onChange: handleDarkChange,
										},
										void 0,
									),
								},
								void 0,
							),
							_jsx(
								'div',
								{
									className: 'control spinner',
									children: _jsx(
										SpinButton,
										{
											label: 'Scale items',
											labelPosition: Position.top,
											value: scaleItemCount.toString(),
											min: SCALE_MIN,
											max: SCALE_MAX,
											step: 1,
											onIncrement: handleScaleIncrement,
											onDecrement: handleScaleDecrement,
											onValidate: handleScaleValidate,
											incrementButtonAriaLabel: 'Increase value by 1',
											decrementButtonAriaLabel: 'Decrease value by 1',
										},
										void 0,
									),
								},
								void 0,
							),
							_jsx(
								'div',
								{
									className: 'control spinner',
									children: _jsx(
										SpinButton,
										{
											label: 'Chart size',
											labelPosition: Position.top,
											value: chartSize.toString(),
											min: 100,
											max: 2000,
											step: 100,
											onIncrement: handleChartIncrement,
											onDecrement: handleChartDecrement,
											onValidate: handleChartValidate,
											incrementButtonAriaLabel: 'Increase value by 1',
											decrementButtonAriaLabel: 'Decrease value by 1',
										},
										void 0,
									),
								},
								void 0,
							),
							_jsx(
								'div',
								{
									className: 'control',
									children: _jsx(
										Toggle,
										{
											label: 'Draw nodes',
											checked: drawNodes,
											onChange: handleDrawNodesChange,
										},
										void 0,
									),
								},
								void 0,
							),
							_jsx(
								'div',
								{
									className: 'control',
									children: _jsx(
										Toggle,
										{
											label: 'Draw links',
											checked: drawLinks,
											onChange: handleDrawLinksChange,
										},
										void 0,
									),
								},
								void 0,
							),
							_jsxs(
								'div',
								{
									className: 'control',
									children: [
										_jsx(
											EnumDropdown,
											{
												enumeration: ColorBlindnessMode,
												label: 'Color blindness',
												selected: colorBlindnessMode,
												onChange: handleColorBlindnessChange,
												styles: {
													root: {
														display: 'flex',
														flexDirection: 'column',
														width: 150,
													},
												},
											},
											void 0,
										),
										colorBlindnessMode !== ColorBlindnessMode.None &&
											_jsx(
												'div',
												{
													className: 'cb-info',
													children: `${cbInfo.description}. Affecting ${
														cbInfo.incidence < 0.01
															? '<1'
															: `~${Math.round(cbInfo.incidence * 100)}`
													}% of males.`,
												},
												void 0,
											),
									],
								},
								void 0,
							),
						],
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
