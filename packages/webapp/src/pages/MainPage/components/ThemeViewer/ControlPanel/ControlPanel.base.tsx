/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './ControlPanel.css'

import type { ISelectableOption } from '@fluentui/react'
import { Position, SpinButton, Toggle } from '@fluentui/react'
import type { FC } from 'react'
import { useCallback } from 'react'

export interface ControlPanelProps {
	chartSize: number
	drawNodes: boolean
	drawLinks: boolean
	onChartSizeChange: (n: number) => void
	onDrawNodesChange: (d: boolean) => void
	onDrawLinksChange: (d: boolean) => void
}

export const ControlPanel: FC<ControlPanelProps> = ({
	chartSize,
	drawNodes,
	drawLinks,
	onChartSizeChange,
	onDrawNodesChange,
	onDrawLinksChange,
}) => {
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

	const handleDrawNodesChange = useCallback(
		(_event: React.MouseEvent<HTMLElement>, checked?: boolean) =>
			onDrawNodesChange(!!checked),
		[onDrawNodesChange],
	)
	const handleDrawLinksChange = useCallback(
		(_event: React.MouseEvent<HTMLElement>, checked?: boolean) =>
			onDrawLinksChange(!!checked),
		[onDrawLinksChange],
	)

	return (
		<div className="chart-control-wrapper">
			<div className="chart-controls">
				<div className="chart-control chart-spinner">
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
				<div className="chart-control">
					<Toggle
						label="Draw nodes"
						checked={drawNodes}
						onChange={handleDrawNodesChange}
					/>
				</div>
				<div className="chart-control">
					<Toggle
						label="Draw links"
						checked={drawLinks}
						onChange={handleDrawLinksChange}
					/>
				</div>
			</div>
		</div>
	)
}
