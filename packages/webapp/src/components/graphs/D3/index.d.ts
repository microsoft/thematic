import { FC } from 'react'
import { Graph } from '../../../interfaces'
export interface GraphProps {
	graph: Graph
	width?: number
	height?: number
	drawNodes?: boolean
	drawLinks?: boolean
	categoricalFill?: boolean
	sequentialFill?: boolean
}
export declare const D3Graph: FC<GraphProps>
