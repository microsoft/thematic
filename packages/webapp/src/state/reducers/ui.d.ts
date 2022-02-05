/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ColorBlindnessMode } from '@thematic/color'
export declare const ui: import('redux').Reducer<
	import('redux').CombinedState<{
		chartSize: number
		drawNodes: boolean
		drawLinks: boolean
		scaleItemCount: number
		colorBlindnessMode: ColorBlindnessMode
	}>,
	| import('redux-actions').Action<number>
	| import('redux-actions').Action<boolean>
	| import('redux-actions').Action<ColorBlindnessMode>
>
