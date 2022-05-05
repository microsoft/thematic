/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useScaleItemCount } from '../../../../state'
import { ThemeEditor as ThemeEditorBase } from './ThemeEditor.base'

export const ThemeEditor = () => {
	const [scaleItemCount] = useScaleItemCount()
	return <ThemeEditorBase scaleItemCount={scaleItemCount} />
}
