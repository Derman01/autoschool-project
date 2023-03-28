import { ComponentOptions } from 'shared/types';
import { ReactNode } from 'react';

export interface PopupOptions extends ComponentOptions {
	headerTitle?: string;
	bodyContent?: ReactNode;
	width?: number;
	id: string;
}

export interface StackOptions extends PopupOptions {
}

export interface ModalOptions extends PopupOptions {
}

export interface PopupOpenerOptions {
	templateOptions: Omit<PopupOptions, 'id'>
}