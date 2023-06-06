import { TDataForm } from 'shared/ui/form';
import { Memory, Server } from 'shared/lib/source';
import { CATEGORY_SOURCE } from 'widgets/category';
import { CarModel } from 'widgets/car';

export const CAR_SOURCE = new Server({
    endpoint: 'cars',
    model: CarModel,
});

export const CarDataForm: TDataForm = [
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Модель автомобиля',
            required: true,
        },
    },
    {
        id: 'reg_number',
        type: 'text',
        options: {
            placeholder: 'Гос. номер',
            required: true,
            patterns: [
                /[АВЕКМНОРСТУХ]/,
                /\d/,
                /\d/,
                /\d/,
                /[АВЕКМНОРСТУХ]/,
                /[АВЕКМНОРСТУХ]/,
            ],
        },
    },
    {
        id: 'category_id',
        type: 'menu',
        options: {
            placeholder: 'Категория',
            required: true,
            source: CATEGORY_SOURCE,
        },
    },
    {
        id: 'gearbox_type',
        type: 'menu',
        options: {
            placeholder: 'КПП',
            source: new Memory({
                data: [
                    {
                        id: 'auto',
                        title: 'АКПП',
                    },
                    {
                        id: 'manual',
                        title: 'МКПП',
                    },
                ],
                keyProperty: 'id',
            }),
        },
        dependence: {
            id: 'category_id',
            conditionRequired: (value) => {
                return [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(value);
            },
        },
    },
];

export const getDataWithValue = (defaultData: TDataForm, data: AnyObject) => {
    return defaultData.map((value) => {
        if (data[value.id]) {
            return {
                ...value,
                options: {
                    ...value.options,
                    value: data[value.id],
                },
            };
        } else return value;
    });
};

type AnyObject = {
    [key: string | number]: any;
};
