/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createRoot } from 'react-dom/client'

import { App } from './App/index.js'

function mount(): void {
	try {
		const rootElement = document.getElementById('root')
		const root = createRoot(rootElement!)
		root.render(<App />)
	} catch (err) {
		console.error('error rendering application', err)
	}
}
mount()
