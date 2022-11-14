/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export type NodeId = string | number;
export interface Node {
	id: NodeId;
	weight: number;
	community?: number;
	x: number;
	y: number;
}

export interface Edge {
	source: NodeId;
	target: NodeId;
	weight: number;
}

export interface Graph {
	nodes: Node[];
	edges: Edge[];
}
