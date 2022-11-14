/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	Color,
	ColorBlindnessMode,
	Scheme,
	SchemeParams,
} from '@thematic/color'

import type { ScaleType, SelectionState, ThemeVariant } from './enums.js'
import type { ThemeConfig } from './ThemeConfig.js'
import type { ThemeDefinition, ThemeSpec } from './ThemeDefinition.js'

/**
 * Overall application level config, e.g., 'chrome'.
 */
export interface Application {
	/**
	 * Base accent color that drives theme
	 */
	accent: () => Color
	/**
	 * Default text color throughout the app
	 */
	foreground: () => Color
	/**
	 * Color used for all main UI backgrounds in an app
	 */
	background: () => Color
	/**
	 * Color for success signals
	 */
	success: () => Color
	/**
	 * Color to use for warning signals
	 */
	warning: () => Color
	/**
	 * Color to use for error signals
	 */
	error: () => Color
	/**
	 * Provides a color that is low contrast against the background for subtle annotations.
	 */
	lowContrast: () => Color
	/**
	 * Provides a color that is low/mid contrast against the background for subtle annotations.
	 */
	lowMidContrast: () => Color
	/**
	 * Provides a color that is medium contrast against the background for moderate annotations.
	 */
	midContrast: () => Color
	/**
	 * Provides a color that is mid/high contrast against the background for brighter annotations.
	 */
	midHighContrast: () => Color
	/**
	 * Provides a color that is high contrast against the background for bright annotations.
	 */
	highContrast: () => Color
	/**
	 * Use for general dividers and borders throughout the application.
	 */
	border: () => Color
	/**
	 * Very faint color for subtle backgrounds and borders.
	 */
	faint: () => Color
}

export interface Chart {
	backgroundColor: () => Color
	padding: () => number
}

/**
 * Marks used for visual encoding of data.
 * Uses SVG attrs for consistency with web standards.
 */
export interface SVGMark {
	fill: (datum?: any) => Color
	fillOpacity: (datum?: any) => number
	stroke: (datum?: any) => Color
	strokeOpacity: (datum?: any) => number
	strokeWidth: (datum?: any) => number
}

export type Rect = SVGMark
export type Area = SVGMark
export type Arc = SVGMark
export type Line = SVGMark
export type Rule = SVGMark
export type Link = SVGMark
export type Flow = SVGMark
export interface Circle extends SVGMark {
	radius: (datum?: any) => number
}
export type Node = Circle
export type Process = Circle
export interface Text extends SVGMark {
	fontFamily: () => string
	fontWeight: () => string
	fontSize: () => number
}

/**
 * Configs used to render chart chrome that doesn't encode data.
 * This is typically things like axis lines, etc. that are often
 * rendered using SVG (d3, vega, etc.), but do not vary with data values or user interaction.
 */
export interface SVGChrome {
	fill: () => Color
	fillOpacity: () => number
	stroke: () => Color
	strokeOpacity: () => number
	strokeWidth: () => number
}

// marks with no signaling
export type PlotArea = SVGChrome
export type GridLines = SVGChrome
export type AxisLine = SVGChrome
export interface AxisTicks extends SVGChrome {
	innerSize: () => number
	outerSize: () => number
}
export type Tooltip = SVGChrome
export interface ChromeText extends SVGChrome {
	fontFamily: () => string
	fontWeight: () => string
	fontSize: () => number
}
export type AxisTitle = ChromeText
export interface AxisTickLabels extends ChromeText {
	padding: () => number
}

export interface ColorScaleFunction {
	/**
	 * Returns an array of scale colors in hex format.
	 * @param length - specific to override, otherwise it will use whatever length the scale was created with
	 */
	toArray: (length?: number) => string[]
	toColors: (length?: number) => Color[]
}

export interface NominalColorScaleFunction extends ColorScaleFunction {
	(key: string | number): Color
}

export interface ContinuousColorScaleFunction extends ColorScaleFunction {
	(value: number): Color
}

export interface ColorScales {
	nominal: (
		sizeOrDomain?: number | string[] | number[],
	) => NominalColorScaleFunction
	nominalBold: (
		sizeOrDomain?: number | string[] | number[],
	) => NominalColorScaleFunction
	nominalMuted: (
		sizeOrDomain?: number | string[] | number[],
	) => NominalColorScaleFunction
	/**
	 * Constructs a sequential numeric scale based on the input domain and specified ScaleType
	 * The input domain should be an array of values.
	 * For linear or log scales, the behavior mimics d3-scale.
	 * For quantile scales, the domain values are used to construct a quantile
	 * division using the requested number of quantile bins
	 */
	sequential: (
		domain?: number[],
		scaleType?: ScaleType,
		quantiles?: number,
	) => ContinuousColorScaleFunction
	sequential2: (
		domain?: number[],
		scaleType?: ScaleType,
		quantiles?: number,
	) => ContinuousColorScaleFunction
	diverging: (
		domain?: number[],
		scaleType?: ScaleType,
		quantiles?: number,
	) => ContinuousColorScaleFunction
	diverging2: (
		domain?: number[],
		scaleType?: ScaleType,
		quantiles?: number,
	) => ContinuousColorScaleFunction
	greys: (
		domain?: number[],
		scaleType?: ScaleType,
		quantiles?: number,
	) => ContinuousColorScaleFunction
}

/**
 * Represents optional config for a theme mark, used at invocation time.
 * For example, you may want to mutate the encoding for a rect using this config,
 * based on runtime options.
 */
export interface MarkConfig {
	/**
	 * Accessor to use for extracting encoding property for the item.
	 */
	accessor?: (datum: any) => string | number
	/**
	 * Selection state to apply for all nodes rendered with this mark config.
	 * A direct enum value can be supplied, which will apply to all nodes.
	 * Otherwise, a function can be supplied that will be invoked for each
	 * item, and should return a SelectionState for that item.
	 */
	selectionState?: SelectionState | ((datum?: any) => SelectionState)
	/**
	 * Scale binding map to apply for nodes rendered with this mark config.
	 */
	scaleBindings?: {
		[key: string]: {
			scale: (datum: any) => any
			/**
			 * Optional accessor function to apply to the datum specifically for this scale.
			 * If omitted, the top-level accessor will be used,
			 * or the datum itself will be returned.
			 */
			accessor?: (datum: any) => string | number
		}
	}
	/**
	 * Direct overrides of mark properties with a fixed value, as opposed to scaled
	 */
	overrides?: {
		[key: string]: any
	}
}

export interface Transformer<T = unknown> {
	(theme: Theme): T
}

export interface ExportConfig {
	/**
	 * Indicates how many color steps to include when generating the sequential and nominal scales.
	 */
	scaleItemCount?: number
}

/**
 * Function that produces an SVGMark config
 */
export type MarkFunction<T> = (markConfig?: MarkConfig) => T

/**
 * Function that produces a SVGChrome config
 */
export type ChromeFunction<T> = () => T

/**
 * This is the theme interface applications will use.
 * The main difference from ThemeDefinition will be first-class methods
 * for computing outputs dynamically instead of just returning JSON field values.
 */
export interface Theme {
	name: string
	dark: boolean
	variant: ThemeVariant
	params: SchemeParams
	scheme: Scheme
	spec: ThemeSpec
	config: ThemeConfig
	definition: ThemeDefinition
	// top-level application/chrome config
	application: ChromeFunction<Application>
	chart: ChromeFunction<Chart>
	// chart svg chrome
	plotArea: ChromeFunction<PlotArea>
	axisLine: ChromeFunction<AxisLine>
	axisTicks: ChromeFunction<AxisTicks>
	axisTickLabels: ChromeFunction<AxisTickLabels>
	axisTitle: ChromeFunction<AxisTitle>
	gridLines: ChromeFunction<GridLines>
	tooltip: ChromeFunction<Tooltip>
	// on-chart svg visual mark encodings
	circle: MarkFunction<Circle>
	rect: MarkFunction<Rect>
	line: MarkFunction<Line>
	rule: MarkFunction<Rule>
	area: MarkFunction<Area>
	arc: MarkFunction<Arc>
	node: MarkFunction<Node>
	link: MarkFunction<Link>
	process: MarkFunction<Process>
	flow: MarkFunction<Flow>
	text: MarkFunction<Text>
	clone(update: ThemeSpec, updatedConfig?: ThemeConfig): Theme
	toJSON(config?: ExportConfig): ThemeSpec
	scales: () => ColorScales
	/**
	 * Return the light version of this Theme
	 */
	toLight: () => Theme
	/**
	 * Return the dark version of this Theme
	 */
	toDark: () => Theme
	/**
	 * Return a color blindness-simulating copy of the theme
	 */
	colorBlindness: (mode: ColorBlindnessMode) => Theme
	/**
	 * Transform this theme with the provided transformation function.
	 * The return type can be anything: review the typings of the supplied transformer.
	 */
	transform: (transformer: Transformer) => unknown
	/**
	 * Returns a theme color that's the closest to a CSS color string we can find.
	 * Note that by default this uses the standard nominal scale with 20 entries so there is plenty of variety to choose from.
	 * Pass in a different scale instance if you want something else to choose from.
	 */
	nearest: (color: string, scale?: NominalColorScaleFunction) => Color
}
