/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { scaleLinear, scaleLog } from 'd3-scale'

// NOTE: the linear/log scale are basically d3 scales, but we haven't exposed the
// full d3 functionality, so they've been nerfed

/**
 * Constructs a linear scale from the input domain,
 * mapping to an output range of [0, 1].
 * Effectively behaves like d3-scale/scaleLinear
 * with less exposed functionality such as chaining
 * @param domain
 */
export function linear(
	domain: number[],
	clamp = true,
): (value: number) => number {
	const scale = scaleLinear().domain(domain).clamp(clamp)
	return (value: number) => scale(value) as number
}

/**
 * Constructs a log scale from the input domain,
 * mapping to an output range of [0, 1].
 * Effectively behaves like d3-scale/scaleLog
 * with less exposed functionality such as chaining
 * @param domain
 */
export function log(domain: number[], clamp = true): (value: number) => number {
	const scale = scaleLog().domain(domain).clamp(clamp)
	return (value: number) => scale(value) as number
}

// holds an array of numbers along with the bounds
// this replicates the histogram format of d3
export interface Bin extends Array<number> {
	x0?: number
	x1?: number
}

function findForwardBreak(data: number[], start: number) {
	const value = data[start - 1]
	for (let i = start; i < data.length; i++) {
		if (data[i] !== value) {
			return i - start
		}
	}
	return data.length - start
}

function findBackwardBreak(data: number[], start: number) {
	const value = data[start - 1]
	for (let i = start - 1; i >= 0; i--) {
		if (data[i] !== value) {
			return start - i - 1
		}
	}
	return start
}

/**
 * Quantize a list of data values into n bins
 * This adds a correction to make sure bins don't break on the same value,
 * so that values only have one correct bin to lie within.
 * Some distributions need this correction because they have such an extreme shape (e.g., zipf)
 * The smoothing is pretty basic, we could use legit variance minimization techniques
 * @param data
 * @param bins
 * @param smoothing look forward and backward to minimize variation in bin lengths
 */
function quantizeHistogram(data: number[], bins: number, smoothing?: boolean) {
	const values = data.sort((a, b) => a - b)
	let binLength = Math.ceil(values.length / bins) // starting bin length is always the ideal
	const binStructure: Bin[] = []
	let start = 0
	for (let i = 0; i < bins; i++) {
		const end = start + binLength
		const forward = findForwardBreak(values, end)
		const backward = findBackwardBreak(values, end)
		const moveBackward = backward < forward && backward < binLength
		const newEnd = smoothing && moveBackward ? end - backward : end + forward
		const bin: Bin = values.slice(start, newEnd)
		if (bin.length > 0) {
			bin.x0 = bin[0]
			bin.x1 = bin[bin.length - 1]
			binStructure.push(bin)
		}

		start = newEnd
		// recalculate bin length with remaining values and bins, in case a really large bin skewed everything
		if (newEnd !== end) {
			binLength = Math.ceil((values.length - newEnd) / (bins - (i + 1)))
		}
	}
	return binStructure
}

/**
 * Constructs a quantile scale from the input domain, splitting the data into n equal-size bins.
 * This makes sure all instances of a given value remain in the same bin,
 * so it _is_ possible to have uneven counts across the bins.
 * This produces a smoother scale visually when there are extreme distributions (such as Pareto)
 * with a relatively low range of integer values.
 * The smoothing parameter can make this slightly better by looking backward as well as forward
 * when finding the next break, as a way of minimizing the variation.
 * @param domain Array of numeric data values to bin into quantiles
 * @param bins Number of quantile bins to use (default = 10)
 */
export function quantile(
	domain: number[],
	bins?: number,
): (value: number) => number {
	const quantized = quantizeHistogram(domain, bins || 10, true)
	const histoLinearScale = scaleLinear()
		.domain([0, bins! - 1])
		.range([0, 1])
	const scale = (value: number) => {
		const binIndex = quantized.findIndex(bin => {
			return value >= bin.x0! && value <= bin.x1!
		})
		return histoLinearScale(binIndex)
	}
	scale.bins = quantized.map(({ x0, x1, length }) => ({
		min: x0,
		max: x1,
		size: length,
	}))
	return scale as (input: number) => number
}

interface LearningState {
	/**
	 * Current value of the learning. When elapsed time is 0 (i.e., the learning was just applied),
	 * this will be 1.0. As time elapses and the learning fades, this declines toward 0.
	 */
	value: number
	/**
	 * This is a measure of the recall strength needed. If learning exposure happens frequently,
	 * this will increase slowly because the recall stays high. As time elapses between exposures,
	 * this increases because recall is more difficult. If the learning value reaches zero (i.e.,
	 * there is too much time between exposures for any reasonable recall), then this resets.
	 */
	strength: number
}
/**
 * Creates a scale that modulates a value in a manner comparable to human learning and recall.
 * The idea is that exposure to a concept results in immediate recall, but over time that recall fades.
 * However, repeat exposure increases the recall _and_ reduces the rate of forgetting.
 *
 * In order to modulate the value over time, we need to keep track of the previous value
 * and the previous learning strength. Therefore the input/output of this scale is an
 * object with a strength and value prop. The first time you call the scale, you can omit this
 * bit of tracked state, but subsequent calls should supply the output of the previous call.
 * For all intents and purposes you can ignore the strength param, just make sure it is included.
 *
 * @param elapsedTime time in milliseconds since the last learning exposure
 * @param state LearningState
 * @returns LearningState
 *
 */
export function recall() {
	/**
	 * @param elapsedTime time in milliseconds since the last learning exposure
	 */
	return (
		elapsedTime: number,
		state: LearningState = { value: 0, strength: 0 },
	): LearningState => {
		const s = { ...state }
		if (elapsedTime === 0) {
			if (s.strength === 0) {
				// first activation - initialize the decay params
				s.strength = 1
				s.value = 1
			} else {
				// follow-on activations, just update the strength
				s.strength += 1 - s.value
			}
		}
		if (s.strength > 0) {
			const d = elapsedTime / 1000 // the learning decay works based on seconds
			const exponent = -d / s.strength
			s.value = Math.exp(exponent)
		} else {
			s.value = 0
		}
		if (s.value === 0) {
			s.strength = 1
		}
		return s
	}
}
