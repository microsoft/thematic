/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { BaseSlots, ThemeGenerator, themeRulesStandardCreator } from '@fluentui/react';
import type { Theme } from '@thematic/core';

import { correctShades } from './shades.js';

type ThemeInputColors = {
	primaryColor: string;
	foregroundColor: string;
	backgroundColor: string;
};
/**
 * Generates a full set of Fluent palette colors using required base input colors.
 * See https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/ThemeGenerator
 * And https://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/theming-designer/index.html
 * And https://github.com/microsoft/fluentui/blob/master/apps/theming-designer/src/components/ThemingDesigner.tsx
 * WARNING: this generates incorrect shades for foreground/background.
 * @param colors
 * @param inverted
 */
const fluentJson = (colors: ThemeInputColors, inverted = false): any => {
	const themeRules = themeRulesStandardCreator();
	ThemeGenerator.insureSlots(themeRules, inverted);
	ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.primaryColor]!]!, colors.primaryColor, inverted);
	ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.foregroundColor]!]!, colors.foregroundColor, inverted);
	ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.backgroundColor]!]!, colors.backgroundColor, inverted);
	ThemeGenerator.insureSlots(themeRules, inverted);
	return ThemeGenerator.getThemeAsJson(themeRules);
};

/**
 * Generates a full set of Fluent palette colors given an input Thematic theme.
 * Corrects the shading issues present in the default Fluent generator
 * @param theme
 * @returns
 */
export const themeJson = (theme: Theme): Record<string, string> => {
	const inverted = theme.dark;
	const colors: ThemeInputColors = {
		primaryColor: theme.application().accent().hex(),
		foregroundColor: theme.application().foreground().hex(),
		backgroundColor: theme.application().background().hex(),
	};
	const json = fluentJson(colors, inverted);
	const fixed = correctShades(json, inverted);
	return fixed;
};
