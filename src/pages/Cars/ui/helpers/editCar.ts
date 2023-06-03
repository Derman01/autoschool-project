import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { getDataWithValue, CarDataForm } from './Constants';

export const editCar = (data: object, afterCreate?: () => Promise<void>) => {
    const onResult = (newData: object) => {
        return new Server({
            endpoint: 'cars',
        })
            .call('update', {
                ...data,
                ...newData,
            })
            .then(() => {
                if (afterCreate) {
                    return afterCreate().then(() => true);
                }
                return true;
            })
            .catch(() => false);
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
