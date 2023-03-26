import React, { FC } from 'react';
import { classNames } from 'shared/lib/helpers';
import './styles/Page.scss';
import { NavigationConfiguration, PageConfiguration } from 'entities/pages';

export interface PageOptions {
	navigationConfig: NavigationConfiguration;
	configuration: PageConfiguration
}

const Page: FC<PageOptions> = (options) => {
	const {
		configuration,
		navigationConfig
	} = options;

	const Content = configuration.content;

	return (
		<div className={classNames('page')}>
			<div className={'page__header'}>
				<div className={'page__header_name'}>{navigationConfig?.name}</div>
			</div>
			<Content className={'page__content'} />
		</div>
	);
};

export default Page;
