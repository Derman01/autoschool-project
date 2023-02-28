import { RouteProps } from 'react-router-dom';
import { ComponentOptions } from 'shared/types';
import { ButtonOptions } from 'shared/ui/buttons';
import { FC } from 'react';

export interface NavigationConfiguration {
	path: string;
	name: string;
	icon?: string;
}

export interface PageConfiguration {
	routeProps: RouteProps;
	content: FC<ComponentOptions>
	headerButtons?:  ButtonOptions[];
}

/**
 * Тип для настройки
 */
export type routeConfigType<PAGE extends string> = Record<PAGE, PageConfiguration>;
