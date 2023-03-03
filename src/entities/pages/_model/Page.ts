import { RouteProps } from 'react-router-dom';
import { ComponentOptions } from 'shared/types';
import { ButtonOptions } from 'shared/ui/buttons';
import { FC } from 'react';

interface HeaderButton extends ButtonOptions {
	id: string;
}

export interface NavigationConfiguration {
	path: string;
	name: string;
	icon?: string;
}

export interface PageConfiguration {
	routeProps: RouteProps;
	content: FC<ComponentOptions>
	headerButtons?: HeaderButton[];
}

/**
 * Тип для настройки
 */
export type routeConfigType<PAGE extends string> = Record<PAGE, PageConfiguration>;
