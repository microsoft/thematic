/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { atom, useRecoilState } from 'recoil'

import { graph } from '../data/index.js'
import type { Graph } from '../types.js'

const graphState = atom<Graph>({
	key: 'graph',
	default: graph,
})

export function useGraph() {
	return useRecoilState(graphState)
}
