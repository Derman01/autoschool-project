import { TDataForm, OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';

export const createCar = (afterCreate: () => void) => {
    const data: TDataForm = [
        {
            id: 'name',
            type: 'text',
            options: {
                placeholder: 'Модель автомобиля',
            },
        },
        {
            id: 'reg_number',
            type: 'text',
            options: {
                placeholder: 'Гос. номер',
            },
        },
    ];

    const onResult = (data: object) => {
        return new Server({
            endpoint: 'cars',
        })
            .call('create', {
                ...data,
            })
            .then(() => afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Добавить автомобиль',
        },
        {
            data,
            onResult,
        }
    );
};
