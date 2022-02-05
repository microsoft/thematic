export declare const graph: {
	nodes: (
		| {
				id: number
				weight: number
				community: number
				x: number
				y: number
		  }
		| {
				id: number
				weight: number
				x: number
				y: number
				community?: undefined
		  }
	)[]
	edges: {
		source: number
		target: number
		weight: number
	}[]
}
