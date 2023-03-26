import { NavigationConfiguration, routeConfigType } from 'entities/pages';
import { StudentPage } from 'pages/Students';
import React from 'react';
import {Navigate} from 'react-router-dom';
import { DemoPage } from 'pages/DemoPage';

export enum PAGES {
	Main = 'main',
	Students = 'students',
	Demo = 'demo',
}

export const ROUTE_PAGE: Record<PAGES, string> = {
	[PAGES.Main]: '/',
	[PAGES.Students]: '/students',
	[PAGES.Demo]: '/demo'
};

export const ROUTE_CONFIG: routeConfigType<PAGES> = {
	[PAGES.Main]: {
		routeProps: {
			path: ROUTE_PAGE.main
		},
		content: () => <Navigate to={'/students'}/>
	},
	[PAGES.Students]: {
		routeProps: {
			path: ROUTE_PAGE.students,
		},
		content: StudentPage
	},
	[PAGES.Demo]: {
		routeProps: {
			path: ROUTE_PAGE.demo,
		},
		content: DemoPage
	}
};

export const NAVIGATION: Partial<Record<PAGES, NavigationConfiguration>> = {
	// [PAGES.Main]: {
	// 	path: ROUTE_CONFIG.main.routeProps.path,
	// 	name: 'Главная'
	// },
	[PAGES.Students]: {
		path: ROUTE_PAGE.students,
		name: 'Студенты'
	}
}

export type RouteConfigType = typeof ROUTE_CONFIG;
export type NavigationType = typeof NAVIGATION;
