/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Theme, Transformer } from '../types/index.js';

export interface PowerBITheme {
	name: string;
	dataColors: string[];
	background: string;
	foreground: string;
	tableAccent: string;
}
/**
 * Creates a JSON format that is compatible with Power BI theming.
 * https://docs.microsoft.com/en-us/power-bi/desktop-report-themes
 * @param theme - the theme
 */
export const powerbi: Transformer<PowerBITheme> = (theme: Theme) => {
	// TODO: this is the very most basic theme properties available. we could do much more with semantic mappings, akin to the Fluent themes
	const nominal = theme.scales().nominal(12);
	const dataColors = new Array(12).fill(1).map((_a, i) => nominal(i).hex());
	const application = theme.application();
	const pbi: PowerBITheme = {
		name: `${theme.name} - ${theme.variant}`,
		dataColors,
		background: application.background().hex(),
		foreground: application.foreground().hex(),
		tableAccent: application.accent().hex(),
	};
	return pbi;
};
