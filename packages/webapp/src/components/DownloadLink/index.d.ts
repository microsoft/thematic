/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	IStyleFunctionOrObject,
	ILinkStyleProps,
	ILinkStyles,
} from '@fluentui/react'
import { FC } from 'react'
export interface DownloadLinkProps {
	/**
	 * Filename to download with
	 */
	filename: string
	/**
	 * Value of the file contents. Direct passthrough to Blob constructor.
	 * https://www.w3.org/TR/FileAPI/#dfn-Blob
	 */
	blobParts: Blob[] | BufferSource[] | string[]
	/**
	 * Additional blob options. Direct passthrough to Blob constructor.
	 * https://www.w3.org/TR/FileAPI/#dfn-BlobPropertyBag
	 */
	options?: BlobPropertyBag
	/**
	 * Display text for the link.
	 * Will default to "Download <filename>" if not provided
	 */
	label?: string
	/** Optional passthrough styles for the link */
	styles?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>
}
export declare const DownloadLink: FC<DownloadLinkProps>
