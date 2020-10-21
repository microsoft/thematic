/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Application, Chart, ApplicationSpec, ChartSpec } from '../types'
import { Color } from '@thematic/color'

export * from './colorScales'
export * from './svg-marks'
export * from './svg-chrome'

export function ApplicationImpl(application: ApplicationSpec): Application {
	return {
		accent: () => new Color(application.accent!),
		background: () => new Color(application.background!),
		foreground: () => new Color(application.foreground!),
		success: () => new Color(application.success!),
		warning: () => new Color(application.warning!),
		error: () => new Color(application.error!),
		lowContrast: () => new Color(application.lowContrast!),
		midContrast: () => new Color(application.midContrast!),
		highContrast: () => new Color(application.highContrast!),
		border: () => new Color(application.border!),
		faint: () => new Color(application.faint!),
	}
}

export function ChartImpl(chart: ChartSpec): Chart {
	return {
		backgroundColor: () => new Color(chart.backgroundColor!),
		padding: () => chart.padding!,
	}
}
