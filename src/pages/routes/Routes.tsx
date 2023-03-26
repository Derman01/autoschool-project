import React, { FC } from 'react';
import './_styles/Routes.scss';
import { Route as ReactRoute, Routes as ReactRoutes } from 'react-router-dom';
import { Accordion, Page } from 'widgets/pages';
import { NavigationType, PAGES, RouteConfigType } from 'app/config/route';
import { PageConfiguration } from 'entities/pages';
import { PopupController } from 'shared/ui/popup';

interface RoutesOptions {
	pages: RouteConfigType
	navigation: NavigationType;
}

const Routes: FC<RoutesOptions> = ({
	pages,
	navigation
}) => {


	const RouteContent = (pageConfig: PageConfiguration, pages: PAGES) => {
		return (
			<div className='Route__page'>
				<Accordion items={Object.values(navigation)}/>
				<Page configuration={pageConfig} navigationConfig={navigation[pages]}/>
				<PopupController/>
			</div>
		);
	}

	return (
		<ReactRoutes>
			{Object.entries(pages).map(([pages, page]: [PAGES, PageConfiguration]) =>
				<ReactRoute key={page.routeProps.path}
							path={page.routeProps.path}
							element={RouteContent(page, pages)}/>
			)}
		</ReactRoutes>
	);
};

export default Routes;
