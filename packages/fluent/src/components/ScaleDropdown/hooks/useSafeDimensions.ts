/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { MutableRefObject } from 'react'
import { useEffect,useState } from 'react'

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 32

export interface Dimensions {
	width: number
	height: number
}

export function useSafeDimensions(
	ref: React.RefObject<HTMLDivElement>,
): Dimensions {
	const dimensions = useDimensions(ref)
	return (
		dimensions || {
			width: DEFAULT_WIDTH,
			height: DEFAULT_HEIGHT,
		}
	)
}

/**
 * Retrieve a non-zero width/height, because collapsible panels can force invalid color arrays
 * @param width
 * @param height
 */
export function useSafeCollapseDimensions(
	width: number,
	height: number,
): [number, number] {
	return [width <= 0 ? 1 : width, height <= 0 ? 1 : height]
}

/**
 * A hook for getting the dimensions of the given element. This hook also updates when the given element resizes.
 * NOTE: ResizeObserver must be defined in the target runtime. BYO polyfill if it is not provided by default
 * @param ref A ref to the element to measure
 * @returns The dimensions for the element.
 */
function useDimensions(
	ref: MutableRefObject<HTMLElement | null>,
): Dimensions | undefined {
	const [dimensions, setDimensions] = useState<Dimensions | undefined>()
	useEffect(() => {
		if (ref && ref.current) {
			const rect = ref.current.getBoundingClientRect()
			let dims: Dimensions = {
				width: Math.floor(rect.width),
				height: Math.floor(rect.height),
			}
			setDimensions(dims)

			const observer = new ResizeObserver(entries => {
				const entry = entries[0]
				if (entry) {
					const newDims = {
						width: Math.floor(entry.contentRect.width),
						height: Math.floor(entry.contentRect.height),
					}
					if (newDims.width !== dims.width || newDims.height !== dims.height) {
						dims = newDims
						setDimensions(newDims)
					}
				}
			})
			observer.observe(ref.current)
			return () => {
				observer.disconnect()
			}
		}
	}, [ref])
	return dimensions 
}
