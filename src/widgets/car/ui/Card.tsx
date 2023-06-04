import { FC } from 'react';
import './styles/EmptyCard.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { ActionButton, Actions } from 'widgets/action';
import { CarModel } from '../models/CarModel';

interface CardOptions extends ComponentOptions {
    item: CarModel;
    actions?: Actions;
    onClick?: (item: CarModel) => void;
}

export const Card: FC<CardOptions> = (options) => {
    const { className, item, actions, onClick } = options;
    return (
        <div
            className={classNames(['car__card', className])}
            onClick={() => onClick(item)}
        >
            <div className="car__card_name">
                {item.Name}{' '}
                <span
                    className={classNames('car__card_status', {
                        free: item.isFree,
                    })}
                >
                    {item.isFree ? 'Свободна' : 'Занята'}
                </span>
            </div>
            <div>
                <span className={'car__card_number'}>Гос. номер </span>
                {item.reg_number}
            </div>
            {item.gearbox_type && (
                <div>
                    <span className={'car__card_number'}>
                        Коробока передач{' '}
                    </span>
                    {item.gearboxString}
                </div>
            )}
            {!item.isFree && (
                <div>
                    <span className={'car__card_number'}>Инструктор </span>
                    {item.Teacher}
                </div>
            )}
            <div className="car__card_teacher"></div>
            {actions && (
                <ActionButton
                    className={'car__card_actions'}
                    source={actions}
                    item={item}
                />
            )}
        </div>
    );
};
