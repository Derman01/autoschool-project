import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { getDataWithValue, CarDataForm } from './Constants';
import { CarModel } from '../../models/CarModel';

export const editCar = (
    data: object,
    afterCreate?: (car: CarModel) => Promise<void>
) => {
    const onResult = (newData: object) => {
        return new Server({
            endpoint: 'cars',
        })
            .edit({
                ...data,
                ...newData,
            })
            .then((car: CarModel) => {
                if (afterCreate) {
                    return afterCreate(car).then(() => true);
                }
                return true;
            })
            .catch(() => false);
    };

    OpenForm(
        {
            width: 500,
            headerTitle: 'Редактирование',
        },
        {
            data: getDataWithValue(CarDataForm, data),
            onResult,
            buttonActionText: 'Редактировать',
        }
    );
};
