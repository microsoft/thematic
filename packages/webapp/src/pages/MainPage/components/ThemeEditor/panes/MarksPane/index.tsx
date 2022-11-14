/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './index.css';

import { EnumButtonBar } from '@essex/components';
import { Label } from '@fluentui/react';
import type { ChromeType, MarkType } from '@thematic/core';
import { SelectionState } from '@thematic/core';
import { useThematicFluent } from '@thematic/fluent';
import type { FC } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { GridCell } from './GridCell.js';

const SIZE = 30;

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
];
const chromeKeys: ChromeType[] = [
	'plotArea',
	'gridLines',
	'axisLine',
	'axisTicks',
	'axisTickLabels',
	'axisTitle',
	'tooltip',
];

export const MarkGrid: FC = () => {
	const theme = useThematicFluent();
	const [selectionState, setSelectionState] = useState<SelectionState>(SelectionState.Normal);
	const handleSelectionStateChange = useCallback((s: string | number) => {
		setSelectionState(s as SelectionState);
	}, []);

	const labelStyle = useMemo(
		() => ({
			fontSize: '0.5em',
			fontWeight: 'bold' as const,
			color: theme.palette.neutralTertiaryAlt,
		}),
		[theme],
	);
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div style={labelStyle}>On-chart marks</div>
			<div className="mark-grid">
				{markKeys.map((key) => (
					<GridCell key={key} name={key} size={SIZE} selectionState={selectionState} />
				))}
				<div>
					<Label>Selection state</Label>
					<div style={{ width: 242 }}>
						<EnumButtonBar<SelectionState>
							enumeration={SelectionState}
							selected={selectionState}
							onChange={handleSelectionStateChange}
							iconNames={iconNames}
							iconOnly={true}
							styles={{
								root: {
									padding: 0,
								},
								primarySet: {
									border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
									padding: 0,
								},
							}}
						/>
					</div>
				</div>
			</div>
			<div style={labelStyle}>Chart chrome</div>
			<div className="mark-grid">
				{chromeKeys.map((key) => (
					<GridCell key={key} name={key} size={SIZE} />
				))}
			</div>
		</div>
	);
};

const iconNames = [
	'CheckMark',
	'CheckBoxComposite',
	'CheckBoxCompositeReversed',
	'GenericScanFilled',
	'Hide',
	'StatusCircleQuestionMark',
];
