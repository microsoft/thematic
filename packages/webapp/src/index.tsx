/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import { store, init } from './state'

import './index.css'

store.dispatch(init)

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	root,
)
