import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SelectionState } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { useState, useCallback, useMemo } from 'react'
import { EnumButtonBar } from '../EnumButtonBar'
import { GridCell } from './GridCell'
import './index.css'
const SIZE = 30
const markKeys = [
	'rect',
	'area',
	'circle',
	'arc',
	'line',
	'rule',
	'node',
	'link',
	'process',
	'flow',
	'text',
]
const chromeKeys = [
	'plotArea',
	'gridLines',
	'axisLine',
	'axisTicks',
	'axisTickLabels',
	'axisTitle',
	'tooltip',
]
export const MarkGrid = () => {
	const theme = useThematic()
	const [selectionState, setSelectionState] = useState(SelectionState.Normal)
	const handleSelectionStateChange = useCallback(s => {
		setSelectionState(s)
	}, [])
	const labelStyle = useMemo(
		() => ({
			fontSize: '0.5em',
			fontWeight: 'bold',
			color: theme.application().lowContrast().hex(),
		}),
		[theme],
	)
	return _jsxs(
		'div',
		{
			style: { display: 'flex', flexDirection: 'column' },
			children: [
				_jsx('div', { style: labelStyle, children: 'On-chart marks' }, void 0),
				_jsxs(
					'div',
					{
						className: 'mark-grid',
						children: [
							markKeys.map(key =>
								_jsx(
									GridCell,
									{ name: key, size: SIZE, selectionState: selectionState },
									key,
								),
							),
							_jsx(
								EnumButtonBar,
								{
									enumeration: SelectionState,
									selected: selectionState,
									onChange: handleSelectionStateChange,
									iconNames: [
										'CheckMark',
										'CheckBoxComposite',
										'CheckBoxCompositeReversed',
										'GenericScanFilled',
										'Hide',
										'StatusCircleQuestionMark',
									],
									iconOnly: true,
									label: 'Selection state',
								},
								void 0,
							),
						],
					},
					void 0,
				),
				_jsx('div', { style: labelStyle, children: 'Chart chrome' }, void 0),
				_jsx(
					'div',
					{
						className: 'mark-grid',
						children: chromeKeys.map(key =>
							_jsx(GridCell, { name: key, size: SIZE }, key),
						),
					},
					void 0,
				),
			],
		},
		void 0,
	)
}
