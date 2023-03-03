import { ComponentOptions } from 'shared/types';
import { ReactNode } from 'react';

export interface StackOptions extends ComponentOptions {
	headerTitle?: string;
	bodyContent?: ReactNode;
	width?: number;
	id: string;
}

export interface StackOpenerOptions {
	templateOptions: Omit<StackOptions, 'id'>
}