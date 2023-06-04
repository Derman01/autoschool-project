import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { CarDataForm } from '../helpers/Constants';

export const createCar = (afterCreate: () => Promise<void>) => {
    const onResult = (data: object) => {
        return new Server({
            endpoint: 'cars',
        })
            .call('create', {
                ...data,
            })
            .then(() => afterCreate().then(() => true))
            .catch(() => false);
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Добавить автомобиль',
        },
        {
            data: CarDataForm,
            onResult,
        }
    );
};
