/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Color } from '@thematic/color'
import {
	Text,
	Circle,
	Rect,
	Line,
	Area,
	Arc,
	Node,
	Link,
	Process,
	Flow,
	SVGMark,
	SignaledSVGSpec,
	RectSpec,
	AreaSpec,
	ArcSpec,
	LineSpec,
	LinkSpec,
	FlowSpec,
	CircleSpec,
	NodeSpec,
	ProcessSpec,
	TextSpec,
	MarkConfig,
	SelectionState,
	Rule,
	RuleSpec,
} from '../types/index.js'

const identity = (datum: any) => datum

// this just returns a string prop for the corresponding spec subobject
function selectionStateString(
	selectionState: SelectionState | ((d?: any) => SelectionState),
	datum: any,
) {
	const state =
		typeof selectionState === 'function'
			? selectionState(datum)
			: selectionState
	switch (state) {
		case SelectionState.Hovered:
			return 'hovered'
		case SelectionState.Selected:
			return 'selected'
		case SelectionState.Suppressed:
			return 'suppressed'
		case SelectionState.Hidden:
			return 'hidden'
		case SelectionState.NoData:
			return 'nodata'
		default:
			return 'normal'
	}
}

// sift through various layers of options to get a final value for a mark
// this includes defaults from the spec, hard-coded overrides, and scaled values
function getMarkValue(
	spec: SignaledSVGSpec,
	property: string,
	markConfig?: MarkConfig,
	datum?: any,
) {
	const selectionState = markConfig && markConfig.selectionState
	const scaleBindings = markConfig && markConfig.scaleBindings
	const overrides = markConfig && markConfig.overrides
	const generalAccessor = markConfig && markConfig.accessor
	const selectionProp = selectionStateString(selectionState!, datum)
	const mark: SignaledSVGSpec = (spec as any)[selectionProp] || spec
	if (overrides && overrides[property]) {
		return overrides[property]
	}
	if (scaleBindings && scaleBindings[property]) {
		const { scale, accessor = generalAccessor || identity } =
			scaleBindings[property]!
		const value = accessor(datum)
		return scale(value)
	}
	return (mark as any)[property]
}

function SVGMarkImpl(spec: SignaledSVGSpec, markConfig?: MarkConfig): SVGMark {
	return {
		fill: (datum?: any) => {
			const color = getMarkValue(spec, 'fill', markConfig, datum)
			// we'll get a Color if the user has supplied one of our scales
			// we need to override it so we can get the computed opacity
			const hex = typeof color === 'string' ? color : color.hex()
			const opacity = getMarkValue(spec, 'fillOpacity', markConfig, datum)
			return new Color(hex, opacity)
		},
		fillOpacity: (datum?: any) => {
			return getMarkValue(spec, 'fillOpacity', markConfig, datum)
		},
		stroke: (datum?: any) => {
			const color = getMarkValue(spec, 'stroke', markConfig, datum)
			const hex = typeof color === 'string' ? color : color.hex()
			const opacity = getMarkValue(spec, 'strokeOpacity', markConfig, datum)
			return new Color(hex, opacity)
		},
		strokeOpacity: (datum?: any) => {
			return getMarkValue(spec, 'strokeOpacity', markConfig, datum)
		},
		strokeWidth: (datum?: any) => {
			return getMarkValue(spec, 'strokeWidth', markConfig, datum)
		},
	}
}

export function RectImpl(spec: RectSpec, markConfig?: MarkConfig): Rect {
	return SVGMarkImpl(spec, markConfig)
}

export function AreaImpl(spec: AreaSpec, markConfig?: MarkConfig): Area {
	return RectImpl(spec, markConfig)
}
export function ArcImpl(spec: ArcSpec, markConfig?: MarkConfig): Arc {
	return SVGMarkImpl(spec, markConfig)
}
export function LineImpl(spec: LineSpec, markConfig?: MarkConfig): Line {
	return SVGMarkImpl(spec, markConfig)
}
export function RuleImpl(spec: RuleSpec, markConfig?: MarkConfig): Rule {
	return SVGMarkImpl(spec, markConfig)
}
export function LinkImpl(spec: LinkSpec, markConfig?: MarkConfig): Link {
	return LineImpl(spec, markConfig)
}
export function FlowImpl(spec: FlowSpec, markConfig?: MarkConfig): Flow {
	return LineImpl(spec, markConfig)
}

export function CircleImpl(spec: CircleSpec, markConfig?: MarkConfig): Circle {
	return {
		...SVGMarkImpl(spec, markConfig),
		radius: (datum?: any) => getMarkValue(spec, 'radius', markConfig, datum),
	}
}

export function NodeImpl(spec: NodeSpec, markConfig?: MarkConfig): Node {
	return CircleImpl(spec, markConfig)
}

export function ProcessImpl(
	spec: ProcessSpec,
	markConfig?: MarkConfig,
): Process {
	return CircleImpl(spec, markConfig)
}

export function TextImpl(spec: TextSpec, markConfig?: MarkConfig): Text {
	return {
		...SVGMarkImpl(spec, markConfig),
		fontWeight: (datum?: any) =>
			getMarkValue(spec, 'fontWeight', markConfig, datum),
		fontFamily: (datum?: any) =>
			getMarkValue(spec, 'fontFamily', markConfig, datum),
		fontSize: (datum?: any) =>
			getMarkValue(spec, 'fontSize', markConfig, datum),
	}
}
