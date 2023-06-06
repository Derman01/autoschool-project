import { FC, useCallback, useState } from 'react';
import './styles/Card.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { CarModel } from '../models/CarModel';
import { Button } from 'shared/ui/buttons';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { deleteCar } from './helpers/deleteCar';
import { editCar } from './helpers/editCar';

interface CardOptions extends ComponentOptions {
    car: CarModel;
    afterUpdate: () => Promise<void>;
}

export const CardPopup: FC<CardOptions> = (options) => {
    const { className, afterUpdate } = options;
    const [carModel, setCarModel] = useState(options.car);
    const { closePopup } = usePopupContext();

    const onEditHandler = useCallback(() => {
        editCar(carModel, (item: CarModel) => {
            setCarModel(
                (car) =>
                    new CarModel({
                        ...car,
                        ...item,
                    })
            );
            return afterUpdate();
        });
    }, [carModel]);

    const onDeleteHandler = useCallback(() => {
        deleteCar(carModel).then(() => {
            afterUpdate().then(() => {
                closePopup();
            });
        });
    }, [carModel]);

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title: 'Название',
                        value: carModel.Name,
                    },
                    {
                        title: 'Гос. номер',
                        value: carModel.Number,
                    },
                    {
                        title: 'Категория',
                        value: (
                            <div>
                                {carModel.CategoryName} -{' '}
                                {carModel.CategoryDescription}
                            </div>
                        ),
                    },
                    carModel.gearbox_type && {
                        title: 'КПП',
                        value: carModel.gearboxString,
                    },
                    !carModel.isFree && {
                        title: 'Инструктор',
                        value: carModel.Teacher,
                    },
                ]}
            />
            <div className="widget-module__Card_actions">
                <Button
                    style={'primary'}
                    title={'Редактировать'}
                    onClick={onEditHandler}
                />
                <Button
                    style={'danger'}
                    title={'Удалить'}
                    onClick={onDeleteHandler}
                />
            </div>
        </div>
    );
};
