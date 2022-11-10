/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Color } from '@thematic/color'
import murmur from 'murmurhash-js'

import { linear, log, quantile } from '../scales.js'
import type {
	ContinuousColorScaleFunction,
	NominalColorScaleFunction,
} from '../types/index.js'
import { ScaleType } from '../types/index.js'

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
		return new Color(color)
	}

	fn.toArray = function (length?: number) {
		const l = length ? length : domain ? domain.length : colors.length
		return new Array(l).fill(1).map((_a, i) => {
			return fn(i).hex()
		})
	}

	fn.toColors = function (length?: number) {
		return this.toArray(length).map(color => new Color(color))
	}

	return fn
}

export function continuous(
	colorStops: string[],
	domain: number[],
	scaleType: ScaleType | undefined,
	quantiles?: number,
): ContinuousColorScaleFunction {
	let scale: (value: number) => number
	// this ensures no infinite values can be used with log scale
	// note that the results can still be unpredictable if the domain crosses zero
	const safedomain = domain.map(d => (d === 0 ? 1e-10 : d))
	switch (scaleType) {
		case ScaleType.Log:
			scale = log(safedomain)
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
		const color = colorStops[i] as string
		return new Color(color)
	}

	fn.toArray = function (length?: number) {
		const l = length || colorStops.length
		const step =
			((domain[domain.length - 1] as number) - (domain[0] as number)) / l
		return new Array(l).fill(1).map((_a, i) => {
			return fn(step * i).hex()
		})
	}

	fn.toColors = function (length?: number) {
		return this.toArray(length).map(color => new Color(color))
	}

	return fn
}
