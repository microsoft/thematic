/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Color } from '@thematic/color'
import type {
	SVGChrome,
	ChromeText,
	PlotArea,
	AxisLine,
	AxisTicks,
	AxisTickLabels,
	AxisTitle,
	GridLines,
	Tooltip,
	SVGSpec,
	AxisTicksSpec,
	PlotAreaSpec,
	GridLinesSpec,
	AxisLineSpec,
	TextSpec,
	AxisTitleSpec,
	AxisTickLabelsSpec,
	TooltipSpec,
} from '../types/index.js'

function SVGChromeImpl(spec: SVGSpec): SVGChrome {
	return {
		fill: () => new Color(spec.fill!, spec.fillOpacity),
		fillOpacity: () => spec.fillOpacity!,
		stroke: () => new Color(spec.stroke!, spec.strokeOpacity),
		strokeOpacity: () => spec.strokeOpacity!,
		strokeWidth: () => spec.strokeWidth!,
	}
}

export function PlotAreaImpl(spec: PlotAreaSpec): PlotArea {
	return SVGChromeImpl(spec)
}

export function GridLinesImpl(spec: GridLinesSpec): GridLines {
	return SVGChromeImpl(spec)
}

export function AxisLineImpl(spec: AxisLineSpec): AxisLine {
	return SVGChromeImpl(spec)
}

export function AxisTicksImpl(spec: AxisTicksSpec): AxisTicks {
	return {
		...SVGChromeImpl(spec),
		innerSize: () => spec.innerSize!,
		outerSize: () => spec.outerSize!,
	}
}

export function ChromeTextImpl(spec: TextSpec): ChromeText {
	return {
		...SVGChromeImpl(spec),
		fontFamily: () => spec.fontFamily!,
		fontWeight: () => spec.fontWeight!,
		fontSize: () => spec.fontSize!,
	}
}

export function AxisTitleImpl(spec: AxisTitleSpec): AxisTitle {
	return ChromeTextImpl(spec)
}

export function AxisTickLabelsImpl(spec: AxisTickLabelsSpec): AxisTickLabels {
	return {
		...ChromeTextImpl(spec),
		padding: () => spec.padding!,
	}
}

export function TooltipImpl(spec: TooltipSpec): Tooltip {
	return SVGChromeImpl(spec)
}
