import { NavigationConfiguration, routeConfigType } from 'entities/pages';
import { StudentPage } from 'pages/Students';
import { TeacherPage } from 'pages/Teachers';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { DemoPage } from 'pages/DemoPage';

export enum PAGES {
	Main = 'main',
	Students = 'students',
	Teachers = 'teachers',
	Demo = 'demo'
}

export const ROUTE_PAGE: Record<PAGES, string> = {
	[PAGES.Main]: '/',
	[PAGES.Students]: '/students',
	[PAGES.Demo]: '/demo',
	[PAGES.Teachers]: '/teachers'
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
	},
	[PAGES.Teachers]: {
		routeProps: {
			path: ROUTE_PAGE.teachers
		},
		content: TeacherPage
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
	},
	[PAGES.Teachers]: {
		path: ROUTE_PAGE.teachers,
		name: 'Преподаватели'
	}
};

export type RouteConfigType = typeof ROUTE_CONFIG;
export type NavigationType = typeof NAVIGATION;
