/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface ThemeListing {
	/**
	 * Friendly name of the theme to display
	 */
	name: string;
	/**
	 * ID of the theme to give to the loader
	 */
	id: string;
	/**
	 * Optional hex code of accent color to display in lists of the theme
	 */
	accent?: string;
}
