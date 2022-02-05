/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme } from '@thematic/core'
import { FC } from 'react'
import './index.css'
export interface CoolerPickerProps {
	themeLoaded: (theme: Theme) => void
}
export declare const CoolerPicker: import('react-redux').ConnectedComponent<
	FC<CoolerPickerProps>,
	import('react-redux').Omit<CoolerPickerProps, 'themeLoaded'>
>
