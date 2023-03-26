import React, { FC } from 'react';
import './styles/accordion.scss';
import { NavLink } from 'react-router-dom';
import { NavigationConfiguration } from 'entities/pages';

export interface AccordionOptions {
	items: NavigationConfiguration[]
}

const Accordion: FC<AccordionOptions> = ({
	items
}) => {
	const getClassNameItem = ({isActive}: {isActive: boolean}): string => {
		return [
			'accordion__pages_item',
			isActive ? 'accordion__pages_item-selected' : ''
		].join(' ');
	}

	return (
		<div className={'accordion'}>
			<div className={'accordion__logo'}>
				{/*TODO*/}
				<div className={'accordion__logo_title'}>Автошкола</div>
				<div className={'accordion__logo_icon'}></div>
			</div>
			<div className={'accordion__pages'}>
				{items.map((item) =>
					<NavLink key={item.path} to={item.path}
							 className={getClassNameItem}>
						{item.name}
					</NavLink>
				)}
			</div>
			<div className={'accordion__shadow'}></div>
		</div>
	);
};

export default Accordion;