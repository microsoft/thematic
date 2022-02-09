/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useScaleItemCount } from '../../state'
import { ThemeEditor as ThemeEditorComponent } from './ThemeEditor'

export const ThemeEditor = () => {
	const [scaleItemCount] = useScaleItemCount()
	return <ThemeEditorComponent scaleItemCount={scaleItemCount} />
}
