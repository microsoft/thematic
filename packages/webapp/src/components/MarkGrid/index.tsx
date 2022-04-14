/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './index.css'

import type { ChromeType, MarkType } from '@thematic/core'
import { SelectionState } from '@thematic/core'
import { useThematic } from '@thematic/react'
import type { FC } from 'react'
import { useCallback, useMemo, useState } from 'react'

import { EnumButtonBar } from '../EnumButtonBar'
import { GridCell } from './GridCell'

const SIZE = 30

const markKeys: MarkType[] = [
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
const chromeKeys: ChromeType[] = [
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
	const handleSelectionStateChange = useCallback((s: string | number) => {
		setSelectionState(s as SelectionState)
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
					iconNames={iconNames}
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

const iconNames = [
	'CheckMark',
	'CheckBoxComposite',
	'CheckBoxCompositeReversed',
	'GenericScanFilled',
	'Hide',
	'StatusCircleQuestionMark',
]
