import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { getDataWithValue, CarDataForm } from './Constants';

export const editCar = (data: object, afterCreate?: () => void) => {
    const onResult = (newData: object) => {
        return new Server({
            endpoint: 'cars',
        })
            .call('update', {
                ...data,
                ...newData,
            })
            .then(() => afterCreate && afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Редактирование',
        },
        {
            data: getDataWithValue(CarDataForm, data),
            onResult,
            buttonActionText: 'Редактировать',
        }
    );
};
