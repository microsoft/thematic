/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useScaleItemCount } from '../../../../state/index.js';
import { ThemeEditor as ThemeEditorBase } from './ThemeEditor.base.js';

export const ThemeEditor = () => {
	const [scaleItemCount] = useScaleItemCount();
	return <ThemeEditorBase scaleItemCount={scaleItemCount} />;
};
