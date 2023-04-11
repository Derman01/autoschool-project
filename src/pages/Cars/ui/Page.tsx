import { FC, useEffect, useState } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { Server } from 'shared/lib/source';
import { CarCard, CarModel, EmptyCardCar } from 'widgets/car';

interface PageOptions extends ComponentOptions {
}

const Page: FC<PageOptions> = (options) => {
	const {className} = options;
	const [cars, setCars] = useState<CarModel[]>([]);

	useEffect(() => {
		new Server({
			endpoint: 'cars',
			model: CarModel
		}).query().then((cars: CarModel[]) => {
			setCars(cars);
		});
	}, []);

	return (
		<div className={classNames(['page__car', className])}>
			<div className="page__car_cards">
				<EmptyCardCar/>
				{
					cars.length ? cars.map((car) => <CarCard key={car.id} item={car}/>) : ''
				}
			</div>
		</div>
	);
};

export default Page;