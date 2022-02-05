import { FC } from 'react'
export interface ChartProps {
	width?: number
	height?: number
}
/**
 * Simple chart using raw d3, intended to show how scale bindings work
 */
export declare const D3Chart: FC<ChartProps>
