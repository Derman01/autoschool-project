import React, { FC } from 'react';
import classNames from './styles/accordion.module.scss';
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
			classNames.accordion__pages_item,
			isActive ? classNames.accordion__pages_itemSelected : ''
		].join(' ');
	}

	return (
		<div className={classNames.accordion}>
			<div className={classNames.accordion__logo}>
				{/*TODO*/}
				<div className={classNames.accordion__logo_icon}></div>
				<div className={classNames.accordion__logo_title}>Автошкола</div>
			</div>
			<div className={classNames.accordion__pages}>
				{items.map((item) =>
					<NavLink key={item.path} to={item.path}
							 className={getClassNameItem}>
						{item.name}
					</NavLink>
				)}
			</div>
		</div>
	);
};

export default Accordion;