/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Color } from '@thematic/color'
import {
	ScaleType,
	NominalColorScaleFunction,
	ContinuousColorScaleFunction,
} from '../types'
import { linear, log, quantile } from '../scales'
import murmur from 'murmurhash-js'

/**
 * Nominal (categorical) scale generator.
 * @param colors
 * @param domain
 */
export function nominal(
	colors: string[],
	/**
	 * Optionally pass in a list of values to pre-seed the color assignment.
	 * They'll be sorted (natural) so other theme instances behave the same.
	 */
	domain?: string[] | number[],
): NominalColorScaleFunction {
	const colorCache = new Map()
	// if an array of values was sent in to predictably seed the nominal order,
	// use it to pre-populate the cache.
	if (domain) {
		const sorted = [...domain].sort()
		sorted.forEach((key, idx) => {
			colorCache.set(`${key}`, colors[idx])
		})
	}
	const getColor = (key: string | number) => {
		const strkey = `${key}`
		if (!colorCache.has(strkey)) {
			const hash =
				typeof key === 'number' ? key : murmur.murmur3(strkey, 0xabcdef)
			colorCache.set(strkey, colors[hash % colors.length])
		}
		const cached = colorCache.get(strkey)
		return cached || 'none'
	}

	const fn = (key: string | number) => {
		const color = getColor(key)
		return new Color(color, 1.0)
	}

	fn.toArray = function (length?: number) {
		const l = length ? length : domain ? domain.length : colors.length
		return new Array(l).fill(1).map((a, i) => {
			return fn(i).hex()
		})
	}

	return fn
}

export function continuous(
	domain: number[],
	colorStops: string[],
	scaleType: ScaleType | undefined,
	quantiles?: number,
): ContinuousColorScaleFunction {
	let scale: (value: number) => number
	switch (scaleType) {
		case ScaleType.Log:
			scale = log(domain)
			break
		case ScaleType.Quantile:
			scale = quantile(domain, quantiles || 10)
			break
		default:
			scale = linear(domain)
			break
	}
	const { length } = colorStops
	const max = length - 1

	const fn = (value: number) => {
		const index = Math.floor(scale(value) * max)
		// make sure the index is in bounds for safe clamping
		const i = index < 0 ? 0 : index > max ? max : index
		const color = colorStops[i]
		return new Color(color, 1.0)
	}

	fn.toArray = function (length?: number) {
		const l = length || colorStops.length
		const step = (domain[domain.length - 1] - domain[0]) / l
		return new Array(l).fill(1).map((a, i) => {
			return fn(step * i).hex()
		})
	}

	return fn
}
