/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { render } from 'react-dom'
import { App } from './components/App'
import { DataContext } from './components/App/DataContext'

function mount(): void {
	try {
		const root = document.getElementById('root')
		render(
			<DataContext>
				<App />
			</DataContext>,
			root,
		)
	} catch (err) {
		console.error('error rendering application', err)
	}
}
mount()
