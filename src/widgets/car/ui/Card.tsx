import { FC } from 'react';
import './styles/EmptyCard.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { ActionButton, Actions } from 'widgets/action';
import { CarModel } from '../models/CarModel';

interface CardOptions extends ComponentOptions {
    item: CarModel;
    actions?: Actions;
}

export const Card: FC<CardOptions> = (options) => {
    const { className, item, actions } = options;

    return (
        <div className={classNames(['car__card', className])}>
            <div className="car__card_name">{item.name}</div>
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
