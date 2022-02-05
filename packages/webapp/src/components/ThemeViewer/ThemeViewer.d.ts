import { FC } from 'react'
import { Graph } from '../../interfaces'
import './index.css'
export interface ThemeViewerProps {
	graph: Graph
	chartSize: number
	drawNodes: boolean
	drawLinks: boolean
}
export declare const ThemeViewer: FC<ThemeViewerProps>
