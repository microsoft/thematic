/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SelectionState } from '@thematic/core'
import { FC } from 'react'
export interface GridCellProps {
	name: string
	size: number
	selectionState?: SelectionState
}
export declare const GridCell: FC<GridCellProps>
