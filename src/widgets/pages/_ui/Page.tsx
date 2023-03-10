import React, { FC } from 'react';
import { classNames } from 'shared/lib/helpers';
import './styles/Page.scss';
import {PageConfiguration} from 'entities/pages';
import {Button} from "shared/ui/buttons";
import { useCommand } from 'shared/hooks/useCommand';

export interface PageOptions {
	configuration: PageConfiguration
}

const Page: FC<PageOptions> = (options) => {
	const {
		configuration
	} = options;

	const Content = configuration.content;

	return (
		<div className={classNames('page')}>
			<div className={'page__header'}>
				{
					configuration.headerButtons?.length &&
					<div className={'page__header_buttons'}>
						{
							configuration.headerButtons.map((button) =>
								<Button key={button.id}
										{...button}
										onClick={() => useCommand.sendCommand(button.id)}
								/>
							)
						}
					</div>
				}
			</div>
			<Content className={'page__content'} />
		</div>
	);
};

export default Page;
