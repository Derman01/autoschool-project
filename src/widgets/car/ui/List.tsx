import { FC, useEffect, useState } from 'react';
import './styles/List.scss';
import { ComponentOptions } from 'shared/types';
import { Server } from 'shared/lib/source';
import { CarCard, CarModel, EmptyCardCar } from 'widgets/car';
import { createCar } from './helpers/createCar';
import { PopupOpener } from 'shared/ui/_popup/PopupOpener';
import { CardPopup } from 'widgets/car/ui/CardPopup';

interface PageOptions extends ComponentOptions {}

export const ListCar: FC<PageOptions> = () => {
    const [cars, setCars] = useState<CarModel[]>(null);

    const loadCars = () => {
        return new Server({
            endpoint: 'cars',
            model: CarModel,
        })
            .query()
            .then((cars: CarModel[]) => {
                setCars(cars);
            });
    };

    const openCard = (car: CarModel) => {
        PopupOpener.createModal({
            templateOptions: {
                headerTitle: 'Карточка автобомиля',
                width: 500,
                bodyContent: <CardPopup car={car} afterUpdate={loadCars} />,
            },
        });
    };

    useEffect(() => {
        loadCars();
    }, []);

    return (
        <div className="page__car_cards">
            {cars && (
                <>
                    <EmptyCardCar actionHandler={() => createCar(loadCars)} />
                    {cars.length &&
                        cars.map((car) => (
                            <CarCard
                                onClick={openCard}
                                key={car.id}
                                item={car}
                            />
                        ))}
                </>
            )}
        </div>
    );
};
