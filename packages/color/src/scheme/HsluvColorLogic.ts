/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import chroma from 'chroma-js'

import { hsluv2hex } from '../chroma.js'
import type { HslVector, Params, Scheme } from '../types'
import {
	greySequence,
	hsluvList2HexList,
	polynomialHslSequence,
} from './functions.js'

/**
 * This section is a set of tuning constants for the color scheme generation.
 * Each one should be parameterized in the functions, but this provides a top-level
 * look at the defaults we use.
 */
const ANALOGOUS_RANGE = 60
const COMPLEMENTARY_RANGE = 60
const MAX_BACKGROUND_CHROMA = 4 // absolute

const MAX_LIGHT_LUMINANCE_OFFSET = 5
const MAX_DARK_LUMINANCE_OFFSET = 10

// not yet done
const LIGHT_TEXT_LUMINANCE = 95
const DARK_TEXT_LUMINANCE = 20
const LIGHT_SCALE_LUMINANCE = 70
const DARK_SCALE_LUMINANCE = 70
const MAX_SATURATION = 100

const LIGHT_SCALE_BACKGROUND_LUMINANCE_SHIFT = 10
const DARK_SCALE_BACKGROUND_LUMINANCE_SHIFT = 3

const NOMINAL_SATURATION = 90
const NOMINAL_LIGHTER_SHIFT = 15
const NOMINAL_DARKER_SHIFT = 30
const BOLD_SATURATION_SHIFT = 10
const MUTED_SATURATION_SHIFT = 55
const MIN_NOMINAL_SATURATION = 10
const MIN_NOMINAL_LUMINANCE = 50
const POLYNOMIAL_EXPONENT = 1.5
const LOW_CONTRAST_BACKGROUND_SHIFT = 20
const DARKEST_GREY = 20
const LIGHTEST_GREY = 90
const OFFSET_BACKGROUND_LUMINANCE_SHIFT = 1

export interface NominalHueSequence {
	bold: [number, number, number][]
	std: [number, number, number][]
	muted: [number, number, number][]
	hues: number[]
	size: number
}

/**
 * Gets an offset hue based on the hue shift param.
 * This is used to tilt the background color slightly.
 * @param hsl
 * @param hueShift
 * @param analagousRange
 * @param complementaryRange
 * @returns
 */
function getOffsetHue(
	hsl: HslVector,
	hueShift: number,
	analogousRange: number = ANALOGOUS_RANGE,
	complementaryRange: number = COMPLEMENTARY_RANGE,
) {
	const [h] = hsl
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

function normalizeSaturation(
	hue: number,
	luminance: number,
	maxBackgroundChroma = MAX_BACKGROUND_CHROMA,
) {
	let satGivingMaxChroma = 100
	// TODO: hsluv to hsl function
	let c = chroma.hex(hsluv2hex(hue, 100, luminance)).hcl()[1]
	while (c > maxBackgroundChroma && satGivingMaxChroma >= 0) {
		satGivingMaxChroma -= 1
		c = chroma.hex(hsluv2hex(hue, satGivingMaxChroma, luminance)).hcl()[1]
	}
	return satGivingMaxChroma
}

function getBackgroundLuminance(
	backgroundLevel: number,
	light: boolean,
	maxLightOffset: number = MAX_LIGHT_LUMINANCE_OFFSET,
	maxDarkOffset: number = MAX_DARK_LUMINANCE_OFFSET,
) {
	if (light) {
		if (backgroundLevel < 50) {
			return 100 - maxLightOffset
		}
		return 100 - maxLightOffset * (1 - (backgroundLevel - 50) / 50)
	} else {
		if (backgroundLevel < 50) {
			return maxDarkOffset
		} else {
			return maxDarkOffset * (1 - (backgroundLevel - 50) / 50)
		}
	}
}

function getBackgroundSaturation(
	hue: number,
	luminance: number,
	backgroundLevel: number,
): number {
	if (backgroundLevel < 50) {
		return (backgroundLevel * normalizeSaturation(hue, luminance)) / 50
	} else {
		return normalizeSaturation(hue, luminance)
	}
}

function getBackgroundHsl(
	accentHsl: HslVector,
	backgroundLevel: number,
	backgroundHueShift: number,
	light: boolean,
): HslVector {
	const h = getOffsetHue(accentHsl, backgroundHueShift)
	const l = getBackgroundLuminance(backgroundLevel, light)
	const s = getBackgroundSaturation(h, l, backgroundLevel)
	return [h, s, l]
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
		this.textLuminance = light ? DARK_TEXT_LUMINANCE : LIGHT_TEXT_LUMINANCE
		this.scaleLuminance = light ? DARK_SCALE_LUMINANCE : LIGHT_SCALE_LUMINANCE

		this.backgroundHsl = getBackgroundHsl(
			this.accentHsl,
			this.backgroundLevel,
			this.backgroundHueShift,
			this.light,
		)
		const [h, s, l] = this.backgroundHsl

		const offsetBackgroundLuminance = light
			? Math.min(100, l + OFFSET_BACKGROUND_LUMINANCE_SHIFT)
			: Math.max(0, l - OFFSET_BACKGROUND_LUMINANCE_SHIFT)
		this.offsetbackgroundHsl = [h, s, offsetBackgroundLuminance]
		this.foregroundHsl = [0, 0, this.textLuminance]

		this.greyLuminance = this.light
			? this.backgroundHsl[2] - DARK_SCALE_BACKGROUND_LUMINANCE_SHIFT
			: this.backgroundHsl[2] + LIGHT_SCALE_BACKGROUND_LUMINANCE_SHIFT
		const mutedGreyLuminance = this.light
			? this.backgroundHsl[2] - LOW_CONTRAST_BACKGROUND_SHIFT
			: this.backgroundHsl[2] + LOW_CONTRAST_BACKGROUND_SHIFT

		const boldGreyLuminance = this.light ? DARKEST_GREY : LIGHTEST_GREY
		const greys = greySequence(
			this.accentHsl[0],
			5,
			mutedGreyLuminance,
			boldGreyLuminance,
		)
		this.lowContrastAnnotationHsl = greys[0] as HslVector
		this.lowMidContrastAnnotationHsl = greys[1] as HslVector
		this.midContrastAnnotationHsl = greys[2] as HslVector
		this.midHighContrastAnnotationHsl = greys[3] as HslVector
		this.highContrastAnnotationHsl = greys[4] as HslVector
		// halfway to the background from the darkest/lightest
		const faintLuminance = this.light
			? (100 - LIGHTEST_GREY) / 2 + LIGHTEST_GREY
			: DARKEST_GREY / 2
		this.faintAnnotationHsl = [this.accentHsl[0], 0, faintLuminance]
	}

	public grey(size: number): HslVector[] {
		const boldGreyLuminance = this.light ? DARKEST_GREY : LIGHTEST_GREY
		return greySequence(
			this.accentHsl[0],
			size,
			this.greyLuminance,
			boldGreyLuminance,
		)
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

	private getAccentsAndComplements(
		size: number,
		offset: number,
	): {
		greyAccent: HslVector
		greyComplement: HslVector
		maxSaturationAccent: HslVector
		maxSaturationComplement: HslVector
	} {
		const { hues: nominalHues } = this.nominal(size)

		const accentHue = nominalHues[offset % nominalHues.length] as number

		const colorLuminance = this.accentHsl[2]
		const greyLuminance = this.greyLuminance
		const complementHue = (accentHue + 90) % 360
		const greyAccent: HslVector = [accentHue, 0, greyLuminance]
		const greyComplement: HslVector = [complementHue, 0, greyLuminance]
		const maxSaturationAccent: HslVector = [
			accentHue,
			MAX_SATURATION,
			colorLuminance,
		]
		const maxSaturationComplement: HslVector = [
			complementHue,
			MAX_SATURATION,
			colorLuminance,
		]

		return {
			greyAccent,
			greyComplement,
			maxSaturationAccent,
			maxSaturationComplement,
		}
	}

	public sequential(size: number, offset = 0): HslVector[] {
		const { greyAccent, maxSaturationAccent } = this.getAccentsAndComplements(
			size,
			offset,
		)
		return polynomialHslSequence(greyAccent, maxSaturationAccent, size)
	}

	public sequentialComplement(size: number, offset = 0): HslVector[] {
		const { greyAccent, maxSaturationComplement } =
			this.getAccentsAndComplements(size, offset)
		return polynomialHslSequence(greyAccent, maxSaturationComplement, size)
	}

	public diverging(size: number, offset = 0): HslVector[] {
		const {
			greyAccent,
			greyComplement,
			maxSaturationAccent,
			maxSaturationComplement,
		} = this.getAccentsAndComplements(size, offset)

		const half = Math.round(size / 2)
		const cut = size % 2 === 0 ? half + 1 : half

		let diverging = polynomialHslSequence(
			greyComplement,
			maxSaturationComplement,
			cut,
			POLYNOMIAL_EXPONENT,
		)
			.slice(1)
			.reverse()

		let toAdd = polynomialHslSequence(
			greyAccent,
			maxSaturationAccent,
			cut,
			POLYNOMIAL_EXPONENT,
		)
		if (size % 2 === 0) {
			toAdd = toAdd.slice(1, cut)
		}
		diverging = diverging.concat(toAdd)
		return diverging
	}

	private getNominalHueSequences(size: number) {
		const nominal: HslVector[] = []
		const nominalBold: HslVector[] = []
		const nominalMuted: HslVector[] = []
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

		let baseSaturation = NOMINAL_SATURATION
		let baseLuminance = this.scaleLuminance

		const addHue = (hue: number) => {
			nominal.push([hue, baseSaturation, baseLuminance])
			nominalBold.push([
				hue,
				0.5 * (NOMINAL_SATURATION + baseSaturation) + BOLD_SATURATION_SHIFT,
				0.5 * (this.scaleLuminance + baseLuminance) - NOMINAL_DARKER_SHIFT,
			])
			nominalMuted.push([
				hue,
				0.5 * (NOMINAL_SATURATION + baseSaturation) - MUTED_SATURATION_SHIFT,
				0.5 * (this.scaleLuminance + baseLuminance) + NOMINAL_LIGHTER_SHIFT,
			])
			nominalHues.push(hue)
			if (nominal.length % 3 === 0) {
				baseSaturation = Math.max(baseSaturation - 1, MIN_NOMINAL_SATURATION)
			}
			if (nominal.length % 6 === 0) {
				baseLuminance = Math.max(baseLuminance - 1, MIN_NOMINAL_LUMINANCE)
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
		background: hsluv2hex(...colorMaker.backgroundHsl),
		offsetBackground: hsluv2hex(...colorMaker.offsetbackgroundHsl),
		foreground: hsluv2hex(...colorMaker.foregroundHsl),
		accent: hsluv2hex(...colorMaker.accentHsl),
		lowContrastAnnotation: hsluv2hex(...colorMaker.lowContrastAnnotationHsl),
		lowMidContrastAnnotation: hsluv2hex(
			...colorMaker.lowMidContrastAnnotationHsl,
		),
		midContrastAnnotation: hsluv2hex(...colorMaker.midContrastAnnotationHsl),
		midHighContrastAnnotation: hsluv2hex(
			...colorMaker.midHighContrastAnnotationHsl,
		),
		highContrastAnnotation: hsluv2hex(...colorMaker.highContrastAnnotationHsl),
		faintAnnotation: hsluv2hex(...colorMaker.faintAnnotationHsl),
		sequential: hsluvList2HexList(
			colorMaker.sequential(sequentialItemCount, 0),
		),
		sequential2: hsluvList2HexList(
			colorMaker.sequential(sequentialItemCount, 1),
		),
		diverging: hsluvList2HexList(colorMaker.diverging(sequentialItemCount, 0)),
		diverging2: hsluvList2HexList(colorMaker.diverging(sequentialItemCount, 1)),
		nominalBold: hsluvList2HexList(nominalSequences.bold),
		nominal: hsluvList2HexList(nominalSequences.std),
		nominalMuted: hsluvList2HexList(nominalSequences.muted),
		greys: hsluvList2HexList(colorMaker.grey(sequentialItemCount)),
		warning: '#ff8c00',
		error: '#d13438',
	}
}
