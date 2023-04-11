import { FC } from 'react';
import './styles/EmptyCard.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { CarModel } from '../models/CarModel';

interface CardOptions extends ComponentOptions {
	item: CarModel;
}

export const Card: FC<CardOptions> = (options) => {
	const {className, item} = options;

	return (
		<div className={classNames(['car__card', className])}>
			<div className="car__card_name">{item.name}</div>
			<div><span className={'car__card_number'}>Гос. номер </span>{item.number}</div>
			<div className="car__card_teacher"></div>
		</div>
	);
};