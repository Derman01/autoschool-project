import React, { FC } from 'react';
import './_styles/Routes.scss';
import { Route as ReactRoute, Routes as ReactRoutes } from 'react-router-dom';
import { Accordion, Page } from 'widgets/pages';
import { NavigationType, RouteConfigType } from 'app/config/route';
import { PageConfiguration } from 'entities/pages';

interface RoutesOptions {
	pages: RouteConfigType
	navigation: NavigationType;
}

const Routes: FC<RoutesOptions> = ({
	pages,
	navigation
}) => {


	const RouteContent = (pageConfig: PageConfiguration) => {
		return (
			<div className='Route__page'>
				<Accordion items={Object.values(navigation)}/>
				<Page configuration={pageConfig}/>
				<div className='Route__page_aside'/>
			</div>
		);
	}

	return (
		<ReactRoutes>
			{Object.entries(pages).map(([_, page]) =>
				<ReactRoute key={page.routeProps.path}
								path={page.routeProps.path}
								element={RouteContent(page)}/>
			)}
		</ReactRoutes>
	);
};

export default Routes;
