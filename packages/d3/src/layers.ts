/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Theme } from '@thematic/core'
import type { Axis } from 'd3-axis'
import type { Selection } from 'd3-selection'

import {
	line as lineCall,
	rect as rectCall,
	svg as svgCall,
	text as textCall,
} from './svg.js'

export interface SelectionOptions {
	/**
	 * This is a map of event handlers to apply to the selection.
	 */
	on: { [key: string]: any }
	/**
	 * This is a map of ad-hoc attrs to apply to the selection.
	 */
	attr: { [key: string]: any }
	/**
	 * Map of ad-hoc classes to add or remove from the selection.
	 */
	classed: { [key: string]: any }
	/**
	 * Map of ad-hoc styles to add or remove from the selection.
	 */
	style: { [key: string]: any }
}

export interface ChartOptions extends SelectionOptions {
	width?: number
	height?: number
}

export interface PlotAreaOptions extends ChartOptions {
	marginTop?: number
	marginBottom?: number
	marginLeft?: number
	marginRight?: number
}

function getSelectionOptions(
	_selection: Selection<Element, any, Element, any>,
	options?: Partial<SelectionOptions>,
): SelectionOptions {
	const _on = options?.on || {}
	const _attr = options?.attr || {}
	const _classed = options?.classed || {}
	const _style = options?.style || {}
	return { on: _on, attr: _attr, classed: _classed, style: _style }
}

function getChartOptions(
	selection: Selection<Element, any, Element, any>,
	options?: ChartOptions,
): ChartOptions {
	const w = options?.width
	const h = options?.height
	const width = w || +selection.attr('width') || 0
	const height = h || +selection.attr('height') || 0
	const sOpts = getSelectionOptions(selection, options)
	return {
		on: sOpts.on,
		attr: {
			// stick these on for application later
			width,
			height,
			...sOpts.attr,
		},
		classed: sOpts.classed,
		style: sOpts.style,
	}
}

function getPlotAreaOptions(
	selection: Selection<Element, any, Element, any>,
	options?: PlotAreaOptions,
): PlotAreaOptions {
	const marginTop = options?.marginTop || 0
	const marginBottom = options?.marginBottom || 0
	const marginLeft = options?.marginLeft || 0
	const marginRight = options?.marginRight || 0

	// for the dimensions we need to either use what is provided directly, or compute from parent
	const w = options?.width
	const h = options?.height
	const parent = selection.select(function (this: any) {
		return this.parentNode
	} as any)
	const pw = (parent && +parent.attr('width')) || 0
	const ph = (parent && +parent.attr('height')) || 0
	const width = w || pw - marginLeft - marginRight
	const height = h || ph - marginTop - marginBottom

	const sOpts = getSelectionOptions(selection, options)
	return {
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		on: sOpts.on,
		attr: {
			// stick these on for application later
			width,
			height,
			...sOpts.attr,
		},
		classed: sOpts.classed,
		style: sOpts.style,
	}
}

/**
 * Applies a key/value map of attrs to a selection.
 * Can be used with d3 selection.call to chain.
 * https://github.com/d3/d3-selection#selection_attr
 * @param selection - the d3 selection
 * @param attrs - the attributes
 */
export function attr(
	selection: Selection<Element, any, Element, any>,
	attrs?: { [key: string]: any },
): Selection<Element, any, Element, any> {
	let ret = selection
	Object.entries(attrs || {}).forEach((entry) => {
		const [key, value] = entry
		ret = selection.attr(key, value)
	})
	return ret
}

/**
 * Applies a key/value map of event handlers to a selection.
 * Can be used with d3 selection.call to chain.
 * https://github.com/d3/d3-selection#selection_on
 * @param selection - the d3 selection
 * @param ons - the event handlers
 */
export function on(
	selection: Selection<Element, any, Element, any>,
	ons?: { [key: string]: any },
): Selection<Element, any, Element, any> {
	let ret = selection
	Object.entries(ons || {}).forEach((entry) => {
		const [key, value] = entry
		ret = selection.on(key, value)
	})
	return ret
}

/**
 * Applies a key/value map of classes to a selection.
 * Use truthy to apply or falsey to remove
 * Can be used with d3 selection.call to chain.
 * https://github.com/d3/d3-selection#selection_classed
 * @param selection - the d3 selection
 * @param classes - the classes
 */
export function classed(
	selection: Selection<Element, any, Element, any>,
	classes?: { [key: string]: any },
): Selection<Element, any, Element, any> {
	let ret = selection
	Object.entries(classes || {}).forEach((entry) => {
		const [key, value] = entry
		ret = selection.classed(key, value)
	})
	return ret
}

/**
 * Applies a key/value map of styles to a selection.
 * Use truthy to apply or falsey to remove
 * Can be used with d3 selection.call to chain.
 * * https://github.com/d3/d3-selection#selection_style
 * @param selection - the d3 selection
 * @param styles - the styles
 */
export function style(
	selection: Selection<Element, any, Element, any>,
	styles?: { [key: string]: any },
): Selection<Element, any, Element, any> {
	let ret = selection
	Object.entries(styles || {}).forEach((entry) => {
		const [key, value] = entry
		ret = selection.style(key, value)
	})
	return ret
}

function applyBaseOptions(
	selection: Selection<Element, any, Element, any>,
	options?: SelectionOptions,
): Selection<Element, any, Element, any> {
	// TODO: we could enumerate all of the core d3-selection functions
	// html, text, etc., for completeness
	return selection
		.call(on, options?.on)
		.call(attr, options?.attr)
		.call(classed, options?.classed)
		.call(style, options?.style)
}
/**
 * Applies chart properties to a selection.
 * This is intended to use with the d3 selection.call mechanism.
 * Warning: this modifies the selection!
 * @param svg -  d3 Selection to configure chart area for. Usually a <svg>.
 * @param theme - the theme
 */
export function chart(
	svg: Selection<Element, any, Element, any>,
	theme: Theme,
	options?: ChartOptions,
): Selection<Element, any, Element, any> {
	const opts = getChartOptions(svg, options)
	return svg
		.classed('thematic-chart', true)
		.call(svgCall, theme.chart())
		.call(applyBaseOptions, opts)
}

/**
 * Applies plot area group properties to the chart.
 * Warning: this modifies the selection!
 * This method also creates a background rectangle to fill the plot area, so we can apply styling.
 * See the options block for properties you can set on this rectangle.
 * @param group - d3 Selection to append plot area to. Usually a <g>.
 *
 * @param theme - the theme
 * @param options - the plot area options
 */
export function plotArea(
	group: Selection<Element, any, Element, any>,
	theme: Theme,
	options?: PlotAreaOptions,
): Selection<Element, any, Element, any> {
	const p = theme.plotArea()
	const opts = getPlotAreaOptions(group, options)
	const { marginTop, marginLeft } = opts
	group
		.classed('thematic-plot-area', true)
		.attr('transform', `translate(${marginLeft ?? 0},${marginTop ?? 0})`)
	// if there's already a background rect, remove it, then insert a new one at the bottom of the stack
	group.select('.thematic-plot-area-background').remove()
	group
		.insert('rect', ':first-child')
		.classed('thematic-plot-area-background', true)
		.call(rectCall as any, p)
		.call(applyBaseOptions as any, opts)
	return group
}

/**
 * Applies axis properties to an axis group.
 * Warning: this modifies the selection!
 * This method updates the axis generator (see d3-axis)
 * to ensure it has theme tick properties,
 * Then applies formatting to the axis line, ticks, and labels
 * according to the theme configuration.
 * @param group - d3 Selection holding the axis. Usually a <g>
 * @param theme - the theme
 * @param axisGenerator - d3-axis generator including scale (this should be an invoked instance of axisBottom, axisTop, axisLeft, or axisRight)
 * @param options - the selection options
 */
export function axis(
	group: Selection<Element, any, Element, any>,
	theme: Theme,
	axisGenerator: Axis<any>,
	options?: SelectionOptions,
): Selection<Element, any, Element, any> {
	/* TODO: there is an expectation that the axis generator has already been
	 * instantiated with a scale, and that the <g> is appropriately transformed to
	 * place it where it belongs. However, it could be easier to pass the
	 * dimensions and margins as options here (like on PlotArea), and create transient scales
	 * to do it all. That would allow only the generator function to be passed instead of the
	 * instance, and simplify the usage quite a bit. If we did this we may want to return that
	 * generator instance so users can continue manipulating it if they want to override anything.
	 */
	const opts = getSelectionOptions(group, options)
	const ticks = theme.axisTicks()
	axisGenerator.tickSizeInner(ticks.innerSize())
	axisGenerator.tickSizeOuter(ticks.outerSize())
	group
		.call(axisGenerator as any)
		.call((g) => g.select('.domain').call(lineCall as any, theme.axisLine()))
		.call((g) => g.selectAll('.tick > line').call(lineCall as any, ticks))
		.call((g) =>
			g.selectAll('.tick > text').call(textCall as any, theme.axisTickLabels()),
		)
		.call(applyBaseOptions, opts)
	return group
}
