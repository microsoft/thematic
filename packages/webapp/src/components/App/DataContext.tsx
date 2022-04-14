/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { memo } from 'react'
import { RecoilRoot } from 'recoil'

export const DataContext: React.FC<
	React.PropsWithChildren<Record<string, never>>
> = memo(function DataContext({ children }) {
	return <RecoilRoot>{children}</RecoilRoot>
})
