import { TDataForm } from 'shared/ui/_form/Menu';

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
