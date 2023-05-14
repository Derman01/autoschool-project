import React from 'react';
import { Navigate } from 'react-router-dom';
import { NavigationConfiguration, routeConfigType } from 'entities/pages';
import { StudentPage } from 'pages/Students';
import { TeacherPage } from 'pages/Teachers';
import { CarsPage } from 'pages/Cars';
import { DemoPage } from 'pages/DemoPage';
import { CalendarPage } from 'pages/Сalendar';
import { ModulesPage } from 'pages/Modules';

export enum PAGES {
    Main = 'main',
    Students = 'students',
    Teachers = 'teachers',
    Cars = 'cars',
    Modules = 'modules',
    Calendar = 'calendar',
    Demo = 'demo',
}

export const ROUTE_PAGE: Record<PAGES, string> = {
    [PAGES.Main]: '/',
    [PAGES.Students]: '/students',
    [PAGES.Demo]: '/demo',
    [PAGES.Teachers]: '/teachers',
    [PAGES.Cars]: '/cars',
    [PAGES.Modules]: '/modules',
    [PAGES.Calendar]: '/calendar',
};

export const ROUTE_CONFIG: routeConfigType<PAGES> = {
    [PAGES.Main]: {
        routeProps: {
            path: ROUTE_PAGE.main,
        },
        content: () => <Navigate to={'/students'} />,
    },
    [PAGES.Students]: {
        routeProps: {
            path: ROUTE_PAGE.students,
        },
        content: StudentPage,
    },
    [PAGES.Demo]: {
        routeProps: {
            path: ROUTE_PAGE.demo,
        },
        content: DemoPage,
    },
    [PAGES.Teachers]: {
        routeProps: {
            path: ROUTE_PAGE.teachers,
        },
        content: TeacherPage,
    },
    [PAGES.Cars]: {
        routeProps: {
            path: ROUTE_PAGE.cars,
        },
        content: CarsPage,
    },
    [PAGES.Modules]: {
        routeProps: {
            path: ROUTE_PAGE.modules,
        },
        content: ModulesPage,
    },
    [PAGES.Calendar]: {
        routeProps: {
            path: ROUTE_PAGE.calendar,
        },
        content: CalendarPage,
    },
};

export const NAVIGATION: Partial<Record<PAGES, NavigationConfiguration>> = {
    // [PAGES.Main]: {
    // 	path: ROUTE_CONFIG.main.routeProps.path,
    // 	name: 'Главная'
    // },
    [PAGES.Students]: {
        path: ROUTE_PAGE.students,
        name: 'Студенты',
    },
    // [PAGES.Calendar]: {
    // 	path: ROUTE_PAGE.calendar,
    // 	name: 'Расписание'
    // },
    [PAGES.Teachers]: {
        path: ROUTE_PAGE.teachers,
        name: 'Преподаватели',
    },
    [PAGES.Cars]: {
        path: ROUTE_PAGE.cars,
        name: 'Автомобили',
    },
    [PAGES.Modules]: {
        path: ROUTE_PAGE.modules,
        name: 'Модули',
    },
};

export type RouteConfigType = typeof ROUTE_CONFIG;
export type NavigationType = typeof NAVIGATION;
