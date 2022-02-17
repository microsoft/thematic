/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Params, Scheme, ColorBlindnessMode } from '@thematic/color'
import merge from 'lodash-es/merge.js'
import {
	nominal,
	continuous,
	ApplicationImpl,
	ChartImpl,
	PlotAreaImpl,
	RectImpl,
	AreaImpl,
	ArcImpl,
	TooltipImpl,
	LineImpl,
	LinkImpl,
	FlowImpl,
	GridLinesImpl,
	AxisLineImpl,
	AxisTicksImpl,
	CircleImpl,
	NodeImpl,
	ProcessImpl,
	TextImpl,
	AxisTitleImpl,
	AxisTickLabelsImpl,
	RuleImpl,
} from './impls/index.js'
import {
	applyParams,
	applyScheme,
	computeDefinition,
	createScheme,
} from './scheme.js'
import {
	Theme as ITheme,
	ThemeSpec,
	ThemeDefinition,
	ThemeConfig,
	ScaleType,
	ColorScales,
	Application,
	Chart,
	PlotArea,
	AxisLine,
	AxisTicks,
	AxisTickLabels,
	AxisTitle,
	GridLines,
	Text,
	Tooltip,
	Circle,
	Rect,
	Line,
	Area,
	Arc,
	Node,
	Link,
	Process,
	Flow,
	MarkConfig,
	ThemeVariant,
	Rule,
	Transformer,
	ExportConfig,
} from './types/index.js'

const defaultConfig = {
	variant: ThemeVariant.Light,
	colorBlindnessMode: ColorBlindnessMode.None,
	overrides: {},
}

export class Theme implements ITheme {
	private _spec: ThemeSpec
	private _themeDefinition: ThemeDefinition
	private _config: ThemeConfig
	private _params: Params
	private _scheme: Scheme
	private _schemeCache: { [size: number]: Scheme }

	/**
	 * Creates a new Theme instance using the params defined in the spec.
	 * Also allows for optional overrides and variants using a config object.
	 * @param spec
	 * @param config
	 */
	public constructor(spec: ThemeSpec, config?: ThemeConfig) {
		const conf = merge({}, defaultConfig, config)
		this._schemeCache = {}
		const scheme = createScheme(spec, conf.variant, conf.colorBlindnessMode)
		this._scheme = scheme
		this._spec = applyScheme(spec)
		this._params = applyParams(this._spec)
		this._themeDefinition = computeDefinition(conf.overrides, this._scheme)
		this._config = conf
	}

	/**
	 * Creates a new Theme using this as the baseline and overlaying updates
	 * to the spec or config
	 */
	public clone = (spec?: ThemeSpec, config?: ThemeConfig): Theme => {
		const overlaySpec = merge({}, this._spec, spec)
		const overlayConfig = merge({}, this._config, config)
		return new Theme(overlaySpec, overlayConfig)
	}
	public light = (): Theme => {
		return this.clone(this._spec, {
			...this._config,
			variant: ThemeVariant.Light,
		})
	}
	public dark = (): Theme => {
		return this.clone(this._spec, {
			...this._config,
			variant: ThemeVariant.Dark,
		})
	}
	public colorBlindness = (mode: ColorBlindnessMode): Theme => {
		return this.clone(this._spec, {
			...this._config,
			colorBlindnessMode: mode,
		})
	}
	public toJSON = (config: ExportConfig = {}): ThemeSpec => {
		return applyScheme(this._spec, config.scaleItemCount)
	}
	public transform = (transformer: Transformer): unknown => {
		return transformer(this)
	}
	public get definition(): ThemeDefinition {
		return this._themeDefinition
	}
	public get name(): string {
		return this._spec.name!
	}
	public get variant(): ThemeVariant {
		return this._config.variant!
	}
	public get spec(): ThemeSpec {
		return this._spec
	}
	public get config(): ThemeConfig {
		return this._config
	}
	public get params(): Params {
		return this._params
	}
	public get scheme(): Scheme {
		return this._scheme
	}

	public scales = (): ColorScales => {
		return {
			nominal: (sizeOrDomain?: number | string[] | number[]) => {
				const size =
					typeof sizeOrDomain === 'number'
						? sizeOrDomain
						: sizeOrDomain
						? sizeOrDomain.length
						: 10
				const domain =
					typeof sizeOrDomain !== 'number' ? sizeOrDomain : undefined
				const scheme = this.getScheme(size)
				return nominal(scheme.nominal, domain)
			},
			nominalBold: (sizeOrDomain?: number | string[] | number[]) => {
				const size =
					typeof sizeOrDomain === 'number'
						? sizeOrDomain
						: sizeOrDomain
						? sizeOrDomain.length
						: 10
				const domain =
					typeof sizeOrDomain !== 'number' ? sizeOrDomain : undefined
				const scheme = this.getScheme(size)
				return nominal(scheme.nominalBold, domain)
			},
			nominalMuted: (sizeOrDomain?: number | string[] | number[]) => {
				const size =
					typeof sizeOrDomain === 'number'
						? sizeOrDomain
						: sizeOrDomain
						? sizeOrDomain.length
						: 10
				const domain =
					typeof sizeOrDomain !== 'number' ? sizeOrDomain : undefined
				const scheme = this.getScheme(size)
				return nominal(scheme.nominalMuted, domain)
			},
			sequential: (
				domain: number[] = [0, 1],
				scaleType?: ScaleType,
				quantiles?: number,
			) => {
				const scheme = this.getScheme(100)
				return continuous(scheme.sequential, domain, scaleType, quantiles)
			},
			sequential2: (
				domain: number[] = [0, 1],
				scaleType?: ScaleType,
				quantiles?: number,
			) => {
				// with our color generation algo, 100 is plenty long to get full granularity
				const scheme = this.getScheme(100)
				return continuous(scheme.sequential2, domain, scaleType, quantiles)
			},
			diverging: (
				domain: number[] = [-1, 1],
				scaleType?: ScaleType,
				quantiles?: number,
			) => {
				const scheme = this.getScheme(100)
				return continuous(scheme.diverging, domain, scaleType, quantiles)
			},
			diverging2: (
				domain: number[] = [-1, 1],
				scaleType?: ScaleType,
				quantiles?: number,
			) => {
				const scheme = this.getScheme(100)
				return continuous(scheme.diverging2, domain, scaleType, quantiles)
			},
			greys: (
				domain: number[] = [0, 1],
				scaleType?: ScaleType,
				quantiles?: number,
			) => {
				const scheme = this.getScheme(100)
				return continuous(scheme.greys, domain, scaleType, quantiles)
			},
		}
	}
	public application = (): Application => {
		return ApplicationImpl(this._themeDefinition.application!)
	}
	public chart = (): Chart => {
		return ChartImpl(this._themeDefinition.chart!)
	}
	public plotArea = (): PlotArea => {
		return PlotAreaImpl(this._themeDefinition.plotArea!)
	}
	public gridLines = (): GridLines => {
		return GridLinesImpl(this._themeDefinition.gridLines!)
	}
	public axisLine = (): AxisLine => {
		return AxisLineImpl(this._themeDefinition.axisLine!)
	}
	public axisTicks = (): AxisTicks => {
		return AxisTicksImpl(this._themeDefinition.axisTicks!)
	}
	public axisTickLabels = (): AxisTickLabels => {
		return AxisTickLabelsImpl(this._themeDefinition.axisTickLabels!)
	}
	public axisTitle = (): AxisTitle => {
		return AxisTitleImpl(this._themeDefinition.axisTitle!)
	}
	public tooltip = (): Tooltip => {
		return TooltipImpl(this._themeDefinition.tooltip!)
	}
	public text = (markConfig?: MarkConfig): Text => {
		return TextImpl(this._themeDefinition.text!, markConfig)
	}
	public circle = (markConfig?: MarkConfig): Circle => {
		return CircleImpl(this._themeDefinition.circle!, markConfig)
	}
	public rect = (markConfig?: MarkConfig): Rect => {
		return RectImpl(this._themeDefinition.rect!, markConfig)
	}
	public line = (markConfig?: MarkConfig): Line => {
		return LineImpl(this._themeDefinition.line!, markConfig)
	}
	public rule = (markConfig?: MarkConfig): Rule => {
		return RuleImpl(this._themeDefinition.rule!, markConfig)
	}
	public area = (markConfig?: MarkConfig): Area => {
		return AreaImpl(this._themeDefinition.area!, markConfig)
	}
	public arc = (markConfig?: MarkConfig): Arc => {
		return ArcImpl(this._themeDefinition.arc!, markConfig)
	}
	public node = (markConfig?: MarkConfig): Node => {
		return NodeImpl(this._themeDefinition.node!, markConfig)
	}
	public link = (markConfig?: MarkConfig): Link => {
		return LinkImpl(this._themeDefinition.link!, markConfig)
	}
	public process = (markConfig?: MarkConfig): Process => {
		return ProcessImpl(this._themeDefinition.process!, markConfig)
	}
	public flow = (markConfig?: MarkConfig): Flow => {
		return FlowImpl(this._themeDefinition.flow!, markConfig)
	}
	/**
	 * Gets the scheme with the appropriate size
	 * @param size The number of elements in the scheme
	 */
	// TODO: this cache overcomes slow scale computes, but they shouldn't be slow
	private getScheme(size = 0) {
		if (!this._schemeCache[size]) {
			this._schemeCache[size] = createScheme(
				this._spec,
				this._config.variant,
				this._config.colorBlindnessMode,
				size,
				size,
			)
		}
		const result = this._schemeCache[size]
		if (!result) {
			throw new Error(`could not locate schema with size ${size}`)
		}
		return result
	}
}
