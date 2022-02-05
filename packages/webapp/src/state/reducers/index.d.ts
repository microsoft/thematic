import { Action } from 'redux-actions'
import { Graph } from '../../interfaces'
export declare const reducer: import('redux').Reducer<
	import('redux').CombinedState<{
		themes: import('@thematic/core').ThemeListing[]
		themeInfo: import('@thematic/core').ThemeListing
		theme: any
		ui: import('redux').CombinedState<{
			chartSize: number
			drawNodes: boolean
			drawLinks: boolean
			scaleItemCount: number
			colorBlindnessMode: import('@thematic/color').ColorBlindnessMode
		}>
		graph: {
			nodes: import('../../interfaces').Node[]
			edges: import('../../interfaces').Edge[]
		}
		params: {
			accentHue: number
			accentSaturation: number
			accentLuminance: number
			backgroundHueShift: number
			backgroundLevel: number
			nominalHueStep: number
		}
	}>,
	| Action<any>
	| Action<import('@thematic/core').ThemeListing[]>
	| Action<import('@thematic/core').ThemeListing>
	| Action<number>
	| Action<boolean>
	| Action<Graph>
	| Action<import('@thematic/color').ColorBlindnessMode>
	| Action<{
			accentHue: number
			accentSaturation: number
			accentLuminance: number
			backgroundHueShift: number
			backgroundLevel: number
			nominalHueStep: number
	  }>
>
