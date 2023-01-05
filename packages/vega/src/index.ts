/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { SVGMark, Theme } from '@thematic/core'
import merge from 'lodash-es/merge.js'
import type { Spec } from 'vega'

function mark(mark: SVGMark) {
	const { fill, fillOpacity, stroke, strokeOpacity, strokeWidth } = mark
	return {
		fill: fill().hex(),
		fillOpacity: fillOpacity(),
		stroke: stroke().hex(),
		strokeOpacity: strokeOpacity(),
		strokeWidth: strokeWidth(),
	}
}

function rect(theme: Theme) {
	return mark(theme.rect())
}
function circle(theme: Theme) {
	return mark(theme.circle())
}
function line(theme: Theme) {
	return mark(theme.line())
}
function rule(theme: Theme) {
	return mark(theme.rule())
}
function area(theme: Theme) {
	return mark(theme.area())
}
function arc(theme: Theme) {
	return mark(theme.arc())
}
function symbol(theme: Theme) {
	return {
		...circle(theme),
		shape: 'circle',
	}
}

function text(theme: Theme) {
	const text = theme.text()
	return {
		...mark(text),
		font: text.fontFamily(),
		fontWeight: text.fontWeight(),
		fontSize: text.fontSize(),
	}
}

function axis(theme: Theme) {
	const axisLine = theme.axisLine()
	const axisTicks = theme.axisTicks()
	const axisTickLabels = theme.axisTickLabels()
	const axisTitle = theme.axisTitle()
	const gridLines = theme.gridLines()
	return {
		domainColor: axisLine.stroke().hex(),
		domainOpacity: axisLine.strokeOpacity(),
		domainWidth: axisLine.strokeWidth(),

		gridColor: gridLines.stroke().hex(),
		gridOpacity: gridLines.strokeOpacity(),
		gridWidth: gridLines.strokeWidth(),

		labelColor: axisTickLabels.fill().hex(),
		labelOpacity: axisTickLabels.fillOpacity(),
		labelFont: axisTickLabels.fontFamily(),
		labelFontSize: axisTickLabels.fontSize(),
		labelPadding: axisTickLabels.padding(),

		tickColor: axisTicks.stroke().hex(),
		tickOpacity: axisTicks.strokeOpacity(),
		tickWidth: axisTicks.strokeWidth(),
		tickSize: axisTicks.outerSize(),

		titleColor: axisTitle.fill().hex(),
		titleOpacity: axisTitle.fillOpacity(),
		titleFont: axisTitle.fontFamily(),
		titleFontSize: axisTitle.fontSize(),
	}
}

function legend(theme: Theme) {
	// TODO: independent legend config instead of copying axis attributes
	const plotArea = theme.plotArea()
	const axisTickLabels = theme.axisTickLabels()
	const axisTitle = theme.axisTitle()
	return {
		fillColor: plotArea.fill().hex(),
		strokeColor: plotArea.stroke().hex(),
		strokeWidth: plotArea.strokeWidth(),

		labelColor: axisTickLabels.fill().hex(),
		labelOpacity: axisTickLabels.fillOpacity(),
		labelFont: axisTickLabels.fontFamily(),
		labelFontSize: axisTickLabels.fontSize(),

		titleColor: axisTitle.fill().hex(),
		titleFont: axisTitle.fontFamily(),
		titleFontSize: axisTitle.fontSize(),
		titleOpacity: axisTitle.fillOpacity(),

		padding: 4,
	}
}

function chart(theme: Theme) {
	return {
		padding: theme.chart().padding(),
		background: theme.chart().backgroundColor().hex(),
	}
}

function group(theme: Theme) {
	return mark(theme.plotArea())
}

function range(theme: Theme, nominalCount = 10, sequentialCount = 100) {
	return {
		category: theme.scales().nominal(nominalCount).toArray(),
		diverging: theme.scales().diverging().toArray(sequentialCount),
		heatmap: theme.scales().rainbow().toArray(),
		ordinal: theme.scales().sequential().toArray(sequentialCount),
		ramp: theme.scales().sequential().toArray(sequentialCount),
	}
}

const transformers = {
	chart,
	group,
	range,
	rect,
	// vega uses the symbol config for circles
	symbol,
	line,
	rule,
	area,
	arc,
	text,
	axis,
	legend,
}

// override stuff where there are bugs in vega
// note that this expects a cloned spec so we can just write to it directly
function __hack_fix__(theme: Theme, spec: Spec) {
	// the default config for arcs does not honor the stroke field,
	// so we're gonna search for any places where an arc is defined and add the stroke directly
	if (spec.marks) {
		spec.marks.forEach((mark) => {
			if (mark.type === 'arc') {
				if (mark.encode?.enter && !mark.encode.enter.stroke) {
					mark.encode.enter.stroke = {
						value: theme.arc().stroke().hex(),
					}
				}
			}
		})
	}
	return spec
}

/**
 * Themes a vega spec using its top-level config block
 * This is pretty easy for most visual properties since our field names match closely
 * See 	https://vega.github.io/vega/docs/config/.
 * Our theme config will _not_ override config blocks that are already in the spec,
 * so you can customize any mark defaults independently.
 */
export function vega(
	theme: Theme,
	spec: Spec,
	options?: {
		width?: number
		height?: number
		nominalCount?: number
		sequentialCount?: number
	},
): Spec {
	const fields = [
		'group',
		'axis',
		'rect',
		'symbol',
		'line',
		'rule',
		'area',
		'arc',
		'text',
		'legend',
	]

	// execute each transformer to get the basic config
	const config = fields.reduce((acc, cur) => {
		acc[cur] = (transformers as any)[cur](theme)
		return acc
	}, {} as any)
	// roll in the range config, which has optional params
	config.range = range(theme, options?.nominalCount, options?.sequentialCount)

	const base: Spec = merge(
		{
			chart: chart(theme),
			width: options?.width,
			height: options?.height,
			config,
		},
		spec,
	)

	return __hack_fix__(theme, base)
}
