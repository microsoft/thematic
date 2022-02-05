/**
 * State entry point for the app - kicks off async starter data, etc.
 */
export declare const init: any
export declare const store: import('redux').Store<
	import('redux').EmptyObject & {
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
			nodes: import('../interfaces').Node[]
			edges: import('../interfaces').Edge[]
		}
		params: {
			accentHue: number
			accentSaturation: number
			accentLuminance: number
			backgroundHueShift: number
			backgroundLevel: number
			nominalHueStep: number
		}
	},
	| import('redux-actions').Action<any>
	| import('redux-actions').Action<import('@thematic/core').ThemeListing[]>
	| import('redux-actions').Action<import('@thematic/core').ThemeListing>
	| import('redux-actions').Action<number>
	| import('redux-actions').Action<boolean>
	| import('redux-actions').Action<import('../interfaces').Graph>
	| import('redux-actions').Action<import('@thematic/color').ColorBlindnessMode>
	| import('redux-actions').Action<{
			accentHue: number
			accentSaturation: number
			accentLuminance: number
			backgroundHueShift: number
			backgroundLevel: number
			nominalHueStep: number
	  }>
> & {
	dispatch: unknown
}
