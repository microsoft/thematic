/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import chroma from 'chroma-js'
import hsluv from 'hsluv'

import type { Params, Scheme } from '../types'

const lightTextLuminance = 95
const darkTextLuminance = 20
const lightScaleLuminance = 70
const darkScaleLuminance = 70
const maxSaturation = 100
const maxLightLuminanceOffset = 5
const maxDarkLuminanceOffset = 10
const maxBackgroundChroma = 4 // absolute
const lightScaleBackgroundLuminanceShift = 10
const darkScaleBackgroundLuminanceShift = 3
const analogousRange = 60
const complementaryRange = 60
const nominalSaturation = 90
const nominalLighterShift = 15
const nominalDarkerShift = 30
const boldSaturationShift = 10
const mutedSaturationShift = 55
const minNominalSaturation = 10
const minNominalLuminance = 50
const linearExponent = 1
const polynomialExponent = 1.5
const lowContrastBackgroundShift = 20
const darkestGrey = 20
const lightestGrey = 90
const offsetBackgroundLuminanceShift = 1

export interface NominalHueSequence {
	bold: [number, number, number][]
	std: [number, number, number][]
	muted: [number, number, number][]
	hues: number[]
	size: number
}

export function polynomial_scale(
	exp: number,
	start: number,
	end: number,
	size: number,
): number[] {
	const base = 1 / (size - 1)
	const interval = end - start
	const result: number[] = []
	for (let i = 0; i < size; i++) {
		result.push(start + interval * (i * base) ** exp)
	}
	return result
}

export type HSLVector = [number, number, number]

export function polynomial_hsl_scale(
	exp: number,
	[sh, ss, sl]: HSLVector,
	[eh, es, el]: HSLVector,
	size: number,
): HSLVector[] {
	const hues = polynomial_scale(exp, sh, eh, size)
	const saturations = polynomial_scale(exp, ss, es, size)
	const luminances = polynomial_scale(exp, sl, el, size)
	const hexvalues: HSLVector[] = []
	for (let i = 0; i < size; i++) {
		hexvalues.push([
			hues[i] as number,
			saturations[i] as number,
			luminances[i] as number,
		])
	}
	return hexvalues
}

// Based on a maximum hue shift of 100 (from the slider)
function getOffsetHue([h]: HSLVector, hueShift: number) {
	if (hueShift >= 25 && hueShift <= 75) {
		//  analogous range
		const delta = (analogousRange * (hueShift - 50)) / 25
		return (h + delta) % 360
	} else if (hueShift > 75) {
		// clockwise complementary range
		const delta = 180 - (complementaryRange * (100 - hueShift)) / 25
		return (h + delta) % 360
	} else {
		// anticlockwise complementary range
		const delta = 180 + (complementaryRange * hueShift) / 25
		return (h + delta) % 360
	}
}

function getBackgroundSaturationaAndLuminance(
	hue: number,
	backgroundLevel: number,
	light: boolean,
): [number, number] {
	function normalizeSaturation(_h: number, l: number) {
		let satGivingMaxChroma = 100
		let c = chroma.hex(hsluv.hsluvToHex([hue, 100, l])).hcl()[1]
		while (c > maxBackgroundChroma && satGivingMaxChroma >= 0) {
			satGivingMaxChroma -= 1
			c = chroma.hex(hsluv.hsluvToHex([hue, satGivingMaxChroma, l])).hcl()[1]
		}
		return satGivingMaxChroma
	}
	if (light) {
		if (backgroundLevel < 50) {
			const l = 100 - maxLightLuminanceOffset
			return [(backgroundLevel * normalizeSaturation(hue, l)) / 50, l]
		} else {
			const l =
				100 - maxLightLuminanceOffset * (1 - (backgroundLevel - 50) / 50)
			return [normalizeSaturation(hue, l), l]
		}
	} else {
		if (backgroundLevel < 50) {
			const l = maxDarkLuminanceOffset
			return [(backgroundLevel * normalizeSaturation(hue, l)) / 50, l]
		} else {
			const l = maxDarkLuminanceOffset * (1 - (backgroundLevel - 50) / 50)
			return [normalizeSaturation(hue, l), l]
		}
	}
}

export class ColorMaker {
	public readonly textLuminance: number
	public readonly scaleLuminance: number
	public readonly backgroundHsl: [number, number, number]
	public readonly offsetbackgroundHsl: [number, number, number]
	public readonly foregroundHsl: [number, number, number]
	public readonly faintAnnotationHsl: [number, number, number]
	public readonly lowContrastAnnotationHsl: [number, number, number]
	public readonly lowMidContrastAnnotationHsl: [number, number, number]
	public readonly midContrastAnnotationHsl: [number, number, number]
	public readonly midHighContrastAnnotationHsl: [number, number, number]
	public readonly highContrastAnnotationHsl: [number, number, number]
	public readonly greyLuminance: number

	private cachedNominalSequence: NominalHueSequence | undefined

	public constructor(
		public readonly accentHsl: [number, number, number],
		public readonly backgroundLevel: number,
		public readonly backgroundHueShift: number,
		public readonly nominalHueStep: number,
		public readonly light: boolean,
	) {
		this.textLuminance = light ? darkTextLuminance : lightTextLuminance
		this.scaleLuminance = light ? darkScaleLuminance : lightScaleLuminance

		const h = getOffsetHue(this.accentHsl, this.backgroundHueShift)
		const [s, l] = getBackgroundSaturationaAndLuminance(
			h,
			this.backgroundLevel,
			this.light,
		)
		this.backgroundHsl = [h, s, l]
		const offsetBackgroundLuminance = light
			? Math.min(100, l + offsetBackgroundLuminanceShift)
			: Math.max(0, l - offsetBackgroundLuminanceShift)
		this.offsetbackgroundHsl = [h, s, offsetBackgroundLuminance]
		this.foregroundHsl = [0, 0, this.textLuminance]

		this.greyLuminance = this.light
			? this.backgroundHsl[2] - darkScaleBackgroundLuminanceShift
			: this.backgroundHsl[2] + lightScaleBackgroundLuminanceShift
		const mutedGreyLuminance = this.light
			? this.backgroundHsl[2] - lowContrastBackgroundShift
			: this.backgroundHsl[2] + lowContrastBackgroundShift

		const boldGreyLuminance = this.light ? darkestGrey : lightestGrey
		const greys = this.explicitGrey(5, mutedGreyLuminance, boldGreyLuminance)
		this.lowContrastAnnotationHsl = greys[0] as HSLVector
		this.lowMidContrastAnnotationHsl = greys[1] as HSLVector
		this.midContrastAnnotationHsl = greys[2] as HSLVector
		this.midHighContrastAnnotationHsl = greys[3] as HSLVector
		this.highContrastAnnotationHsl = greys[4] as HSLVector
		// halfway to the background from the darkest/lightest
		const faintLuminance = this.light
			? (100 - lightestGrey) / 2 + lightestGrey
			: darkestGrey / 2
		this.faintAnnotationHsl = [this.accentHsl[0], 0, faintLuminance]
	}

	public grey(size: number): HSLVector[] {
		const boldGreyLuminance = this.light ? darkestGrey : lightestGrey
		return this.explicitGrey(size, this.greyLuminance, boldGreyLuminance)
	}

	public nominal(size: number): NominalHueSequence {
		if (
			!this.cachedNominalSequence ||
			this.cachedNominalSequence.size !== size
		) {
			const { nominalBold, nominal, nominalMuted, nominalHues } =
				this.getNominalHueSequences(size)
			this.cachedNominalSequence = {
				bold: nominalBold,
				std: nominal,
				muted: nominalMuted,
				hues: nominalHues,
				size: nominal.length,
			}
		}
		return this.cachedNominalSequence
	}

	private explicitGrey(
		size: number,
		startLuminance: number,
		endLuminance: number,
	) {
		const greyFrom: HSLVector = [this.accentHsl[0], 0, startLuminance]
		const greyTo: HSLVector = [this.accentHsl[0], 0, endLuminance]
		return polynomial_hsl_scale(linearExponent, greyFrom, greyTo, size)
	}

	private getAccentsAndComplements(
		size: number,
		offset: number,
	): {
		greyAccent: HSLVector
		greyComplement: HSLVector
		maxSaturationAccent: HSLVector
		maxSaturationComplement: HSLVector
	} {
		const { hues: nominalHues } = this.nominal(size)

		const accentHue = nominalHues[offset % nominalHues.length] as number

		const colorLuminance = this.accentHsl[2]
		const greyLuminance = this.greyLuminance
		const complementHue = (accentHue + 90) % 360
		const greyAccent: HSLVector = [accentHue, 0, greyLuminance]
		const greyComplement: HSLVector = [complementHue, 0, greyLuminance]
		const maxSaturationAccent: HSLVector = [
			accentHue,
			maxSaturation,
			colorLuminance,
		]
		const maxSaturationComplement: HSLVector = [
			complementHue,
			maxSaturation,
			colorLuminance,
		]

		return {
			greyAccent,
			greyComplement,
			maxSaturationAccent,
			maxSaturationComplement,
		}
	}

	public sequential(size: number, offset = 0): HSLVector[] {
		const { greyAccent, maxSaturationAccent } = this.getAccentsAndComplements(
			size,
			offset,
		)
		return polynomial_hsl_scale(
			linearExponent,
			greyAccent,
			maxSaturationAccent,
			size,
		)
	}

	public sequentialComplement(size: number, offset = 0): HSLVector[] {
		const { greyAccent, maxSaturationComplement } =
			this.getAccentsAndComplements(size, offset)
		return polynomial_hsl_scale(
			linearExponent,
			greyAccent,
			maxSaturationComplement,
			size,
		)
	}

	public diverging(size: number, offset = 0): HSLVector[] {
		const {
			greyAccent,
			greyComplement,
			maxSaturationAccent,
			maxSaturationComplement,
		} = this.getAccentsAndComplements(size, offset)

		const half = Math.round(size / 2)
		const cut = size % 2 === 0 ? half + 1 : half

		let diverging = polynomial_hsl_scale(
			polynomialExponent,
			greyComplement,
			maxSaturationComplement,
			cut,
		)
			.slice(1)
			.reverse()

		let toAdd = polynomial_hsl_scale(
			polynomialExponent,
			greyAccent,
			maxSaturationAccent,
			cut,
		)
		if (size % 2 === 0) {
			toAdd = toAdd.slice(1, cut)
		}
		diverging = diverging.concat(toAdd)
		return diverging
	}

	private getNominalHueSequences(size: number) {
		const nominal: HSLVector[] = []
		const nominalBold: HSLVector[] = []
		const nominalMuted: HSLVector[] = []
		const nominalHues: number[] = []
		let hues: number[] = []
		const h = this.accentHsl[0]

		const initialHues =
			this.nominalHueStep <= 10
				? 13 - this.nominalHueStep
				: this.nominalHueStep - 8

		const hueDirection = this.nominalHueStep <= 10 ? -1 : 1

		let hueStep = 360.0 / initialHues

		for (let i = 0; i < initialHues; i += 1) {
			hues.push((h + i * hueDirection * hueStep) % 360)
		}

		while (hues.length < size) {
			hueStep = hueStep / 2
			const newHues: number[] = []
			for (const existingHue of hues) {
				newHues.push((existingHue + hueDirection * hueStep) % 360)
				if (hues.length + newHues.length === size) {
					break
				}
			}
			hues = hues.concat(newHues)
		}

		// trim the core hues to match requested size
		// this acounts for initialHues calculation
		// which can result in minimum counts higher than requested
		hues = hues.slice(0, size)

		let baseSaturation = nominalSaturation
		let baseLuminance = this.scaleLuminance

		const addHue = (hue: number) => {
			nominal.push([hue, baseSaturation, baseLuminance])
			nominalBold.push([
				hue,
				0.5 * (nominalSaturation + baseSaturation) + boldSaturationShift,
				0.5 * (this.scaleLuminance + baseLuminance) - nominalDarkerShift,
			])
			nominalMuted.push([
				hue,
				0.5 * (nominalSaturation + baseSaturation) - mutedSaturationShift,
				0.5 * (this.scaleLuminance + baseLuminance) + nominalLighterShift,
			])
			nominalHues.push(hue)
			if (nominal.length % 3 === 0) {
				baseSaturation = Math.max(baseSaturation - 1, minNominalSaturation)
			}
			if (nominal.length % 6 === 0) {
				baseLuminance = Math.max(baseLuminance - 1, minNominalLuminance)
			}
		}

		for (const finalHue of hues) {
			addHue(finalHue)
		}

		return {
			nominal,
			nominalBold,
			nominalMuted,
			nominalHues,
		}
	}
}

export function hsluv_to_hex(values: HSLVector[]): string[] {
	return values.map(c => hsluv.hsluvToHex(c))
}

// TODO: this should probably throw errors if out-of-bounds values are submitted OR, wrap around the geometry if that's always valid
export function getScheme(
	params: Params,
	nominalItemCount: number,
	sequentialItemCount: number,
	light: boolean,
): Scheme {
	const {
		accentHue,
		accentSaturation,
		accentLuminance,
		backgroundLevel,
		backgroundHueShift,
		nominalHueStep,
	} = params

	const colorMaker = new ColorMaker(
		[accentHue, accentSaturation, accentLuminance],
		backgroundLevel,
		backgroundHueShift,
		nominalHueStep,
		light,
	)

	const nominalSequences = colorMaker.nominal(nominalItemCount)

	return {
		background: hsluv.hsluvToHex(colorMaker.backgroundHsl),
		offsetBackground: hsluv.hsluvToHex(colorMaker.offsetbackgroundHsl),
		foreground: hsluv.hsluvToHex(colorMaker.foregroundHsl),
		accent: hsluv.hsluvToHex(colorMaker.accentHsl),
		lowContrastAnnotation: hsluv.hsluvToHex(
			colorMaker.lowContrastAnnotationHsl,
		),
		lowMidContrastAnnotation: hsluv.hsluvToHex(
			colorMaker.lowMidContrastAnnotationHsl,
		),
		midContrastAnnotation: hsluv.hsluvToHex(
			colorMaker.midContrastAnnotationHsl,
		),
		midHighContrastAnnotation: hsluv.hsluvToHex(
			colorMaker.midHighContrastAnnotationHsl,
		),
		highContrastAnnotation: hsluv.hsluvToHex(
			colorMaker.highContrastAnnotationHsl,
		),
		faintAnnotation: hsluv.hsluvToHex(colorMaker.faintAnnotationHsl),
		sequential: hsluv_to_hex(colorMaker.sequential(sequentialItemCount, 0)),
		sequential2: hsluv_to_hex(colorMaker.sequential(sequentialItemCount, 1)),
		diverging: hsluv_to_hex(colorMaker.diverging(sequentialItemCount, 0)),
		diverging2: hsluv_to_hex(colorMaker.diverging(sequentialItemCount, 1)),
		nominalBold: hsluv_to_hex(nominalSequences.bold),
		nominal: hsluv_to_hex(nominalSequences.std),
		nominalMuted: hsluv_to_hex(nominalSequences.muted),
		greys: hsluv_to_hex(colorMaker.grey(sequentialItemCount)),
		warning: '#ff8c00',
		error: '#d13438',
	}
}
