/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Color } from '@thematic/color'
import type {
	Application,
	Chart,
	ApplicationSpec,
	ChartSpec,
} from '../types/index.js'

export * from './colorScales.js'
export * from './svg-marks.js'
export * from './svg-chrome.js'

export function ApplicationImpl(application: ApplicationSpec): Application {
	return {
		accent: () => new Color(application.accent!),
		background: () => new Color(application.background!),
		foreground: () => new Color(application.foreground!),
		success: () => new Color(application.success!),
		warning: () => new Color(application.warning!),
		error: () => new Color(application.error!),
		lowContrast: () => new Color(application.lowContrast!),
		lowMidContrast: () => new Color(application.lowMidContrast!),
		midContrast: () => new Color(application.midContrast!),
		midHighContrast: () => new Color(application.midHighContrast!),
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
