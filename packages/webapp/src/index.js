import { jsx as _jsx } from 'react/jsx-runtime'
/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import { store, init } from './state'
import './index.css'
store.dispatch(init)
const root = document.createElement('div')
document.body.appendChild(root)
render(
	_jsx(Provider, { store: store, children: _jsx(App, {}, void 0) }, void 0),
	root,
)
