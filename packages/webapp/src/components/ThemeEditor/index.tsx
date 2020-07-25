/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { connect } from 'react-redux'
import { ThemeEditor as ThemeEditorComponent } from './ThemeEditor'

export const ThemeEditor = connect((state: any) => ({
	scaleItemCount: state.ui.scaleItemCount,
}))(ThemeEditorComponent)
