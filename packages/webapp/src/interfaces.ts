/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface Node {
	id: string
	weight: number
	community: number
	x: number
	y: number
}

export interface Edge {
	source: string
	target: string
	weight: number
}

export interface Graph {
	nodes: Node[]
	edges: Edge[]
}
