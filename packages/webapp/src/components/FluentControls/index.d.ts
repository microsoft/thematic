/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme } from '@thematic/core'
import { FC } from 'react'
export interface FluentControlsComponentProps {
	themeLoaded: (theme: Theme) => void
}
export declare const FluentControls: import('react-redux').ConnectedComponent<
	FC<FluentControlsComponentProps>,
	import('react-redux').Omit<FluentControlsComponentProps, 'themeLoaded'>
>
