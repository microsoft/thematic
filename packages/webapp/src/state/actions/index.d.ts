/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Params, ColorBlindnessMode } from '@thematic/color'
import { Theme, ThemeListing } from '@thematic/core'
import { Dispatch } from 'redux'
import { Graph } from '../../interfaces'
export declare const themesLoaded: import('redux-actions').ActionFunction1<
	ThemeListing[],
	import('redux-actions').Action<ThemeListing[]>
>
export declare const themeInfoSelected: import('redux-actions').ActionFunction1<
	ThemeListing,
	import('redux-actions').Action<ThemeListing>
>
export declare const themeLoaded: import('redux-actions').ActionFunction1<
	Theme,
	import('redux-actions').Action<Theme>
>
export declare const themeEdited: import('redux-actions').ActionFunctionAny<
	import('redux-actions').Action<any>
>
export declare const themeVariantToggled: import('redux-actions').ActionFunctionAny<
	import('redux-actions').Action<any>
>
export declare const paramsChanged: import('redux-actions').ActionFunction1<
	Params,
	import('redux-actions').Action<Params>
>
export declare const chartSizeChanged: import('redux-actions').ActionFunction1<
	number,
	import('redux-actions').Action<number>
>
export declare const drawNodesChanged: import('redux-actions').ActionFunction1<
	boolean,
	import('redux-actions').Action<boolean>
>
export declare const drawLinksChanged: import('redux-actions').ActionFunction1<
	boolean,
	import('redux-actions').Action<boolean>
>
export declare const graphLoaded: import('redux-actions').ActionFunction1<
	Graph,
	import('redux-actions').Action<Graph>
>
export declare const scaleItemCountChanged: import('redux-actions').ActionFunction1<
	number,
	import('redux-actions').Action<number>
>
export declare const colorBlindnessModeChanged: import('redux-actions').ActionFunction1<
	ColorBlindnessMode,
	import('redux-actions').Action<ColorBlindnessMode>
>
export declare const themeSelected: (
	themeInfo: ThemeListing,
) => (dispatch: Dispatch) => void
