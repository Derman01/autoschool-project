import { FC, useEffect, useState } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { Server } from 'shared/lib/source';
import { CarCard, CarModel, EmptyCardCar } from 'widgets/car';
import { Actions } from 'widgets/action';
import { createCar } from './helpers/createCar';
import { editCar } from './helpers/editCar';
import { deleteCar } from './helpers/deleteCar';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const [cars, setCars] = useState<CarModel[]>([]);

    const loadCars = () => {
        new Server({
            endpoint: 'cars',
        })
            .query()
            .then((cars: CarModel[]) => {
                setCars(cars);
            });
    };

    useEffect(() => {
        loadCars();
    }, []);

    const actions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                editCar(item, loadCars);
                return Promise.resolve();
            },
        },
        {
            id: 'remove',
            title: 'Удалить',
            handler: (item) => {
                return deleteCar(item).then(loadCars);
            },
        },
        {
            id: 'print',
            title: 'Печать документа “Карточка учета вождения автомобиля”',
        },
    ];

    return (
        <div className={classNames(['page__car', className])}>
            <div className="page__car_cards">
                <EmptyCardCar actionHandler={() => createCar(loadCars)} />
                {cars.length &&
                    cars.map((car) => (
                        <CarCard actions={actions} key={car.id} item={car} />
                    ))}
            </div>
        </div>
    );
};

export default Page;
