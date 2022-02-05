import { FC } from 'react'
export interface JSONPaneProps {
	scaleItemCount?: number
}
export declare const JSONPane: import('react-redux').ConnectedComponent<
	FC<JSONPaneProps>,
	import('react-redux').Omit<JSONPaneProps, 'scaleItemCount'>
>
