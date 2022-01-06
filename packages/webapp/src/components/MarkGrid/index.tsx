/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SelectionState } from '@thematic/core'
import { useThematic } from '@thematic/react'
import { useState, useCallback, useMemo, FC } from 'react'
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

export const MarkGrid: FC = () => {
	const theme = useThematic()
	const [selectionState, setSelectionState] = useState<SelectionState>(
		SelectionState.Normal,
	)
	const handleSelectionStateChange = useCallback(s => {
		setSelectionState(s)
	}, [])

	const labelStyle = useMemo(
		() => ({
			fontSize: '0.5em',
			fontWeight: 'bold' as const,
			color: theme.application().lowContrast().hex(),
		}),
		[theme],
	)
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={labelStyle}>On-chart marks</div>
			<div className="mark-grid">
				{markKeys.map(key => (
					<GridCell
						key={key}
						name={key}
						size={SIZE}
						selectionState={selectionState}
					/>
				))}
				<EnumButtonBar<SelectionState>
					enumeration={SelectionState}
					selected={selectionState}
					onChange={handleSelectionStateChange}
					iconNames={[
						'CheckMark',
						'CheckBoxComposite',
						'CheckBoxCompositeReversed',
						'GenericScanFilled',
						'Hide',
						'StatusCircleQuestionMark',
					]}
					iconOnly
					label={'Selection state'}
				/>
			</div>
			<div style={labelStyle}>Chart chrome</div>
			<div className="mark-grid">
				{chromeKeys.map(key => (
					<GridCell key={key} name={key} size={SIZE} />
				))}
			</div>
		</div>
	)
}
