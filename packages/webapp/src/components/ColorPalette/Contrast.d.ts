import { FC } from 'react'
export interface ContrastProps {
	foreground: string
	background: string
	error: string
	showLink?: boolean
}
export declare const Contrast: FC<ContrastProps>
