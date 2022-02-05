import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ScaleType } from '@thematic/core'
import {
	ScaleDropdown,
	ScaleTypeChoiceGroup,
	ColorPicker,
	ColorPickerButton,
} from '@thematic/fluent'
import { useThematic } from '@thematic/react'
import { useState, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { themeLoaded } from '../../state/actions'
const FluentControlsComponent = ({ themeLoaded }) => {
	const theme = useThematic()
	const [scale, setScale] = useState('<none>')
	const handleScaleChange = useCallback((e, option) => setScale(option.key), [])
	const [scaleType, setScaleType] = useState(ScaleType.Linear)
	const handleScaleTypeChange = useCallback(type => setScaleType(type), [])
	const handlePickerChange = useCallback(t => themeLoaded(t), [themeLoaded])
	const labelStyle = useMemo(
		() => ({
			fontWeight: 'bold',
			color: theme.application().accent().hex(),
		}),
		[theme],
	)
	const actionStyle = useMemo(
		() => ({
			fontSize: 12,
			fontFamily: 'monospace',
			color: theme.application().warning().hex(),
		}),
		[theme],
	)
	return _jsxs(
		'div',
		{
			style: {
				fontSize: 14,
				overflowY: 'scroll',
			},
			children: [
				_jsx(
					'p',
					{
						children:
							'The @thematic/fluent package contains a few custom Fluent controls you can use in your applications to allow Thematic-specific interactions.',
					},
					void 0,
				),
				_jsxs(
					'div',
					{
						style: controlsStyle,
						children: [
							_jsxs(
								'div',
								{
									style: controlStyle,
									children: [
										_jsxs(
											'p',
											{
												children: [
													_jsx(
														'span',
														{ style: labelStyle, children: 'ScaleDropdown:' },
														void 0,
													),
													' a Dropdown that pre-loads Thematic scale options.',
												],
											},
											void 0,
										),
										_jsx(
											ScaleDropdown,
											{
												placeholder: 'Choose scale',
												onChange: handleScaleChange,
											},
											void 0,
										),
										_jsxs(
											'p',
											{ style: actionStyle, children: [' onChange: ', scale] },
											void 0,
										),
									],
								},
								void 0,
							),
							_jsxs(
								'div',
								{
									style: controlStyle,
									children: [
										_jsxs(
											'p',
											{
												children: [
													_jsx(
														'span',
														{
															style: labelStyle,
															children: 'ScaleTypeChoiceGroup:',
														},
														void 0,
													),
													' a ChoiceGroup that pre-loads Thematic scale types.',
												],
											},
											void 0,
										),
										_jsx(
											ScaleTypeChoiceGroup,
											{
												selectedType: scaleType,
												onChange: handleScaleTypeChange,
											},
											void 0,
										),
										_jsxs(
											'p',
											{
												style: actionStyle,
												children: [' onChange: ', scaleType],
											},
											void 0,
										),
									],
								},
								void 0,
							),
							_jsxs(
								'div',
								{
									style: controlStyle,
									children: [
										_jsxs(
											'p',
											{
												children: [
													_jsx(
														'span',
														{ style: labelStyle, children: 'ColorPicker:' },
														void 0,
													),
													' a ColorPicker that emits Thematic parameters.',
												],
											},
											void 0,
										),
										_jsx(
											ColorPicker,
											{ theme: theme, onChange: handlePickerChange },
											void 0,
										),
										_jsxs(
											'p',
											{
												style: actionStyle,
												children: [
													' ',
													'onChange: ',
													theme.application().accent().hex(),
												],
											},
											void 0,
										),
									],
								},
								void 0,
							),
							_jsxs(
								'div',
								{
									style: controlStyle,
									children: [
										_jsxs(
											'p',
											{
												children: [
													_jsx(
														'span',
														{
															style: labelStyle,
															children: 'ColorPickerButton:',
														},
														void 0,
													),
													' a DropdownButton that hosts a Thematic ColorPicker.',
												],
											},
											void 0,
										),
										_jsx(
											ColorPickerButton,
											{ theme: theme, onChange: handlePickerChange },
											void 0,
										),
										_jsxs(
											'p',
											{
												style: actionStyle,
												children: [
													' ',
													'onChange: ',
													theme.application().accent().hex(),
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
				),
			],
		},
		void 0,
	)
}
export const FluentControls = connect(null, {
	themeLoaded,
})(FluentControlsComponent)
const controlsStyle = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	justifyContent: 'space-around',
}
const controlStyle = {
	width: 320,
	padding: 8,
	margin: 8,
}
