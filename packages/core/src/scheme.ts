/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ColorBlindnessMode, Scheme, SchemeParams } from '@thematic/color'
import { colorBlindness, defaultParams, getScheme } from '@thematic/color'
import merge from 'lodash-es/merge.js'
import set from 'lodash-es/set.js'

import defaults from './themes/defaults.js'
import type { SVGSpec, ThemeDefinition, ThemeSpec } from './types/index.js'

// these are static default settings for the marks that are not derived from the computed scheme
const DEFAULT_NOMINAL_ITEMS = 10
const DEFAULT_SEQUENTIAL_ITEMS = 100

type Config = {
	value: string | number
	paths: string[]
}

/**
 * Creates a completed SchemeParams block from a ThemeDefinition, making sure missing optional fields are populated.
 * @param themeDefinition
 */
export function applyParams(spec: ThemeSpec): SchemeParams {
	const { params } = spec
	return {
		...defaultParams,
		...params,
	}
}

/**
 * Creates a computed scheme from a ThemeDefinition (specifically, the SchemeParams in the definition).
 * Note that this creates scales with 10 items as a default, useful for saving to file, etc.
 * If more gradations are desired, a new scheme should be created at point-of-use.
 * TODO: separate the scale bisection using Scheme functions that allow request of different
 * counts from the same Scheme instance.
 * @param themeDefinition
 */
export function createScheme(
	spec: ThemeSpec,
	dark = false,
	colorBlindnessMode?: ColorBlindnessMode,
	nominalItemCount: number = DEFAULT_NOMINAL_ITEMS,
	sequentialItemCount: number = DEFAULT_SEQUENTIAL_ITEMS,
): Scheme {
	const params = applyParams(spec)
	const scheme = getScheme(params, nominalItemCount, sequentialItemCount, !dark)
	return colorBlindness(scheme, colorBlindnessMode)
}

export function applyScheme(
	spec: ThemeSpec,
	nominalItemCount: number = DEFAULT_NOMINAL_ITEMS,
	sequentialItemCount: number = DEFAULT_SEQUENTIAL_ITEMS,
): ThemeSpec {
	const light = getScheme(
		spec.params!,
		nominalItemCount,
		sequentialItemCount,
		true,
	)
	const dark = getScheme(
		spec.params!,
		nominalItemCount,
		sequentialItemCount,
		false,
	)
	return {
		...spec,
		light,
		dark,
	}
}

/**
 * Copies computed scheme colors into appropriate theme definition properties for fills, scales, etc.
 * @param spec
 * @param overrides
 * @param scheme
 */
export function computeDefinition(
	overrides: ThemeDefinition,
	scheme: Scheme,
): ThemeDefinition {
	// we only need to fill in the subset of properties we want to overwrite, because lodash merge will do a deep overlay
	// this bit of config defines the mapping declaratively, the reducer below it creates the correct subobjects to merge
	// https://lodash.com/docs/#merge
	// lodash also lets us target very specific properties dynamically with set
	// https://lodash.com/docs#set
	const baseConfigs: Config[] = [
		{
			value: scheme.background,
			paths: ['application.background'],
		},
		{
			value: scheme.foreground,
			paths: ['application.foreground'],
		},
		{
			value: scheme.offsetBackground,
			paths: ['plotArea.fill'],
		},
		{
			value: scheme.accent,
			paths: ['application.accent', 'application.success'],
		},
		{
			value: scheme.warning,
			paths: ['application.warning'],
		},
		{
			value: scheme.error,
			paths: ['application.error'],
		},
		{
			value: scheme.nominal[0] as string,
			paths: [
				'rect.fill',
				'area.fill',
				'arc.fill',
				'node.fill',
				'circle.stroke',
				'line.stroke',
			],
		},
		{
			// very light grey, for subtle borders and backgrounds
			value: scheme.faintAnnotation,
			paths: ['application.faint', 'gridLines.stroke'],
		},
		{
			// low contrast grey, so they don't occupy lots of visual attention
			value: scheme.lowContrastAnnotation,
			paths: [
				'tooltip.fill',
				'plotArea.stroke',
				'axisLine.stroke',
				'axisTicks.stroke',
				'arc.stroke',
				'application.border',
				'application.lowContrast',
			],
		},
		{
			value: scheme.lowMidContrastAnnotation,
			paths: ['application.lowMidContrast'],
		},
		{
			// medium contrast grey, for general, non-aggressive mark bounds
			value: scheme.midContrastAnnotation,
			paths: [
				'axisTickLabels.fill',
				'axisTitle.fill',
				'process.fill',
				'tooltip.stroke',
				'application.midContrast',
			],
		},
		{
			value: scheme.midHighContrastAnnotation,
			paths: ['application.midHighContrast'],
		},
		{
			// high contrast grey for bolder annotation such as labels
			value: scheme.highContrastAnnotation,
			paths: [
				'text.fill',
				'node.stroke',
				'link.stroke',
				'process.stroke',
				'flow.stroke',
				'rule.stroke',
				'application.highContrast',
			],
		},
	]

	const base = reduceConfig(baseConfigs)

	// this is the core populated overlay with all computed colors but no signals
	// note that theme definition goes last because it may contain manual overrides
	const baseOverlay: ThemeDefinition = merge({}, defaults, base, overrides)

	const signalConfigs: Config[] = [
		{
			value: scheme.nominalBold[0] as string,
			paths: [
				'rect.hovered.fill',
				'area.hovered.fill',
				'arc.hovered.fill',
				'node.hovered.fill',
				'circle.hovered.stroke',
				'line.hovered.stroke',
				'rect.selected.fill',
				'area.selected.fill',
				'arc.selected.fill',
				'node.selected.fill',
				'circle.selected.stroke',
				'line.selected.stroke',
			],
		},
		{
			value: scheme.nominalMuted[0] as string,
			paths: [
				'rect.suppressed.fill',
				'area.suppressed.fill',
				'arc.suppressed.fill',
				'node.suppressed.fill',
				'circle.suppressed.stroke',
				'line.suppressed.stroke',
			],
		},
		{
			value: scheme.faintAnnotation,
			paths: [
				'rect.nodata.fill',
				'area.nodata.fill',
				'arc.nodata.fill',
				'node.nodata.fill',
				'text.nodata.fill',
				'process.nodata.fill',
				'arc.nodata.stroke',
				'circle.nodata.stroke',
				'line.nodata.stroke',
				'link.nodata.stroke',
				'rule.nodata.stroke',
				'flow.nodata.stroke',
			],
		},
		{
			value: scheme.lowContrastAnnotation,
			paths: [
				'process.suppressed.fill',
				'rule.suppressed.stroke',
				'flow.suppressed.stroke',
				'node.nodata.stroke',
				'process.nodata.stroke',
			],
		},
		{
			value: scheme.midContrastAnnotation,
			paths: [
				'text.suppressed.fill',
				'node.suppressed.stroke',
				'link.suppressed.stroke',
				'process.suppressed.stroke',
				'rule.hovered.stroke',
				'flow.hovered.stroke',
				'process.hovered.stroke',
				'rule.selected.stroke',
				'flow.selected.stroke',
				'process.selected.stroke',
			],
		},
		{
			value: scheme.highContrastAnnotation,
			paths: ['process.hovered.fill', 'process.selected.fill'],
		},
		{
			value: 1,
			paths: [
				'rect.selected.fillOpacity',
				'area.selected.fillOpacity',
				'arc.selected.fillOpacity',
				'node.selected.fillOpacity',
				'circle.selected.fillOpacity',
				'line.selected.fillOpacity',
				'link.selected.fillOpacity',
				'text.selected.fillOpacity',
				'rect.selected.strokeOpacity',
				'area.selected.strokeOpacity',
				'arc.selected.strokeOpacity',
				'node.selected.strokeOpacity',
				'circle.selected.strokeOpacity',
				'line.selected.strokeOpacity',
				'link.selected.strokeOpacity',
				'rect.hovered.fillOpacity',
				'area.hovered.fillOpacity',
				'arc.hovered.fillOpacity',
				'node.hovered.fillOpacity',
				'circle.hovered.fillOpacity',
				'line.hovered.fillOpacity',
				'link.hovered.fillOpacity',
				'rect.hovered.strokeOpacity',
				'area.hovered.strokeOpacity',
				'arc.hovered.strokeOpacity',
				'node.hovered.strokeOpacity',
				'circle.hovered.strokeOpacity',
				'line.hovered.strokeOpacity',
				'link.hovered.strokeOpacity',
			],
		},
		{
			value: 0.5,
			paths: [
				'rect.suppressed.fillOpacity',
				'area.suppressed.fillOpacity',
				'arc.suppressed.fillOpacity',
				'node.suppressed.fillOpacity',
				'circle.suppressed.fillOpacity',
				'line.suppressed.fillOpacity',
				'link.suppressed.fillOpacity',
				'process.suppressed.fillOpacity',
				'rect.suppressed.strokeOpacity',
				'area.suppressed.strokeOpacity',
				'arc.suppressed.strokeOpacity',
				'node.suppressed.strokeOpacity',
				'circle.suppressed.strokeOpacity',
				'line.suppressed.strokeOpacity',
				'link.suppressed.strokeOpacity',
				'process.suppressed.strokeOpacity',
				'flow.suppressed.strokeOpacity',
				'rule.suppressed.strokeOpacity',
			],
		},
		{
			value: 0,
			paths: [
				'rect.hidden.fillOpacity',
				'area.hidden.fillOpacity',
				'arc.hidden.fillOpacity',
				'node.hidden.fillOpacity',
				'circle.hidden.fillOpacity',
				'line.hidden.fillOpacity',
				'process.hidden.fillOpacity',
				'text.hidden.fillOpacity',
				'rect.hidden.strokeOpacity',
				'area.hidden.strokeOpacity',
				'arc.hidden.strokeOpacity',
				'node.hidden.strokeOpacity',
				'circle.hidden.strokeOpacity',
				'line.hidden.strokeOpacity',
				'link.hidden.strokeOpacity',
				'process.hidden.strokeOpacity',
				'flow.hidden.strokeOpacity',
				'rule.hidden.strokeOpacity',
			],
		},
		{
			value: 'none',
			paths: [
				'rect.hidden.fill',
				'area.hidden.fill',
				'arc.hidden.fill',
				'node.hidden.fill',
				'circle.hidden.fill',
				'line.hidden.fill',
				'process.hidden.fill',
				'text.hidden.fill',
				'rect.hidden.stroke',
				'area.hidden.stroke',
				'arc.hidden.stroke',
				'node.hidden.stroke',
				'circle.hidden.stroke',
				'line.hidden.stroke',
				'process.hidden.stroke',
				'flow.hidden.stroke',
				'text.hidden.stroke',
				'rule.hidden.stroke',
			],
		},
		{
			value: 'bold',
			paths: ['text.hovered.fontWeight', 'text.selected.fontWeight'],
		},
	]

	const signalOverlay = reduceConfig(signalConfigs)

	const signalMarks = [
		'circle',
		'rect',
		'line',
		'area',
		'arc',
		'node',
		'link',
		'process',
		'flow',
		'text',
		'rule',
	]

	// this gives a fully-complete set of marks with populated signal props as copies of the originals
	const signalDefaultsOverlay = signalMarks.reduce(
		(acc: ThemeDefinition, cur: string) => {
			const b = baseOverlay[cur as keyof ThemeDefinition] as SVGSpec
			const s = {
				hovered: { ...b },
				selected: { ...b },
				suppressed: { ...b },
				hidden: { ...b },
				nodata: { ...b },
			}
			acc[cur as keyof ThemeDefinition] = s
			return acc
		},
		{} as ThemeDefinition,
	)

	const merged: ThemeDefinition = merge(
		baseOverlay,
		signalDefaultsOverlay,
		signalOverlay,
	)

	return merged
}

function reduceConfig(configs: Config[]): ThemeDefinition {
	return configs.reduce((acc, cur) => {
		const { value, paths } = cur
		paths.forEach(path => set(acc, path, value))
		return acc
	}, {} as ThemeDefinition)
}
