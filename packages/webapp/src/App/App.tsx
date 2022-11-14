/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC } from 'react';

import { MainPage } from '../pages/MainPage/index.js';
import { DataContext } from './DataContext.js';
import { StyleContext } from './StyleContext.js';

export const App: FC = () => {
	return (
		<DataContext>
			<StyleContext>
				<MainPage />
			</StyleContext>
		</DataContext>
	);
};
