/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { RecoilRoot } from 'recoil';

export const DataContext: FC<{
	children?: ReactNode;
}> = memo(function DataContext({ children }) {
	return <RecoilRoot>{children}</RecoilRoot>;
});
