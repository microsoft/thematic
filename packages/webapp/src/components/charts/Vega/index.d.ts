import { FC } from 'react'
export declare const charts: string[]
export interface VegaChartProps {
	type: string
	width?: number
	height?: number
}
export declare const VegaChart: FC<VegaChartProps>
