/**
 * Compute the bounds for a node list
 * @param nodes
 */
export function bounds(nodes) {
	return nodes.reduce(
		(acc, cur) => [
			Math.min(acc[0], cur.x),
			Math.max(acc[1], cur.x),
			Math.min(acc[2], cur.y),
			Math.max(acc[3], cur.y),
		],
		[Number.MAX_VALUE, Number.MIN_VALUE, Number.MAX_VALUE, Number.MIN_VALUE],
	)
}
