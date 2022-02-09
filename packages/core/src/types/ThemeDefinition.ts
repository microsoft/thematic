/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Params, Scheme } from '@thematic/color'

// TODO: the *Spec versions of these are for the raw json properties
// this would be MUCH better specified as a JSONSchema with included validator
// the difference between these and the regular theme are that the json fields
// are all optional and primitive types, while the Theme guarantees every field
// will be present, and will be represented using an accessor function

export interface ApplicationSpec {
	accent?: string
	background?: string
	foreground?: string
	success?: string
	warning?: string
	error?: string
	lowContrast?: string
	lowMidContrast?: string
	midContrast?: string
	midHighContrast?: string
	highContrast?: string
	border?: string
	faint?: string
}

export interface ChartSpec {
	backgroundColor?: string
	padding?: number
}

export interface SVGSpec {
	fill?: string
	fillOpacity?: number
	stroke?: string
	strokeOpacity?: number
	strokeWidth?: number
}

export type HoveredSVGSpec = SVGSpec
export type SelectedSVGSpec = SVGSpec
export type SuppressedSVGSpec = SVGSpec
export type HiddenSVGSpec = SVGSpec

export interface SignaledSVGSpec extends SVGSpec {
	hovered?: HoveredSVGSpec
	selected?: SelectedSVGSpec
	suppressed?: SuppressedSVGSpec
	hidden?: HiddenSVGSpec
}

// marks that have signaling
export type RectSpec = SignaledSVGSpec
export type LineSpec = SignaledSVGSpec
export type RuleSpec = SignaledSVGSpec
export type AreaSpec = SignaledSVGSpec
export type ArcSpec = SignaledSVGSpec
export type NodeSpec = SignaledSVGSpec
export type LinkSpec = SignaledSVGSpec
export interface CircleSpec extends SignaledSVGSpec {
	radius?: number
}
// TODO: some form of general Shape spec with a "size"
// that can be mapped to radius, area, etc.
export type ProcessSpec = CircleSpec
export type FlowSpec = SignaledSVGSpec

export interface TextSpec extends SignaledSVGSpec {
	fontFamily?: string
	fontWeight?: string
	fontSize?: number
}

// marks with no signaling
export type PlotAreaSpec = SVGSpec
export type GridLinesSpec = SVGSpec
export type AxisLineSpec = SVGSpec
export interface AxisTicksSpec extends SVGSpec {
	innerSize?: number
	outerSize?: number
}
export interface AxisTickLabelsSpec extends SVGSpec {
	padding?: number
	fontFamily?: string
	fontSize?: number
}
export interface AxisTitleSpec extends SVGSpec {
	fontFamily?: string
	fontSize?: number
}
export type TooltipSpec = SVGSpec

/**
 * This is the core interface for raw JSON theme definition files.
 * This holds just the basic persisted params, as well as the computed color scheme.
 * All other specific mappings are applied during instantiation in the AppliedThemeDefinition
 */
export interface ThemeSpec {
	name?: string
	params?: Params
	light?: Scheme
	dark?: Scheme
}

/**
 * This is the complete instantiated mapping of a ThemeSpec from input parameters to definitions.
 * Note the spec includes the light and dark variants, the definition is an instance of one as requested during load.
 */
export interface ThemeDefinition {
	application?: ApplicationSpec
	chart?: ChartSpec
	plotArea?: PlotAreaSpec
	axisLine?: AxisLineSpec
	axisTicks?: AxisTicksSpec
	axisTickLabels?: AxisTickLabelsSpec
	axisTitle?: AxisTitleSpec
	gridLines?: GridLinesSpec
	text?: TextSpec
	tooltip?: TooltipSpec
	circle?: CircleSpec
	rect?: RectSpec
	line?: LineSpec
	rule?: RuleSpec
	area?: AreaSpec
	arc?: ArcSpec
	node?: NodeSpec
	link?: LinkSpec
	process?: ProcessSpec
	flow?: FlowSpec
}
