/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme, Transformer } from '../types'

/**
 * Creates a JSON format that is compatible with Power BI theming.
 * https://docs.microsoft.com/en-us/power-bi/desktop-report-themes
 * @param theme
 */
export const powerbi: Transformer = (theme: Theme) => {
	// TODO: this is the very most basic theme properties available. we could do much more with semantic mappings, akin to the Fluent themes
	const nominal = theme.scales().nominal(12)
	const dataColors = new Array(12).fill(1).map((a, i) => nominal(i).hex())
	const application = theme.application()
	const pbi = {
		name: `${theme.name} - ${theme.variant}`,
		dataColors,
		background: application.background().hex(),
		foreground: application.foreground().hex(),
		tableAccent: application.accent().hex(),
	}
	return pbi
}
