import { TDataForm } from 'shared/ui/_form/Menu';
import { Memory, Server } from 'shared/lib/source';
import CarModel from 'pages/Teachers/models/CardModel';

export const TeacherDataForm: TDataForm = [
    {
        id: 'surname',
        type: 'text',
        options: {
            placeholder: 'Фамилия',
        },
    },
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Имя',
        },
    },
    {
        id: 'patronymic',
        type: 'text',
        options: {
            placeholder: 'Отчество',
        },
    },
    {
        id: 'is_practician',
        type: 'menu',
        options: {
            placeholder: 'Должность',
            source: new Memory({
                data: [
                    {
                        id: '0',
                        title: 'Лектор',
                    },
                    {
                        id: '1',
                        title: 'Инструктор по практике',
                    },
                ],
                keyProperty: 'id',
            }),
        },
    },
    {
        id: 'education',
        type: 'menu',
        options: {
            placeholder: 'Образование',
            source: new Memory({
                data: [
                    {
                        id: 'Среднее общее',
                        title: 'Среднее общее',
                    },
                    {
                        id: 'Cреднее профессиональное',
                        title: 'Cреднее профессиональное',
                    },
                    {
                        id: 'Высшее',
                        title: 'Высшее',
                    },
                ],
                keyProperty: 'id',
            }),
        },
    },
    {
        id: 'certificate',
        type: 'text',
        options: {
            placeholder: 'Удостоверение',
        },
    },
    {
        id: 'driver_certificate_category',
        type: 'menu',
        options: {
            placeholder: 'Категория',
            source: new Memory({
                data: [
                    {
                        id: 'A',
                        title: 'A',
                    },
                    {
                        id: 'B',
                        title: 'B',
                    },
                    {
                        id: 'C',
                        title: 'C',
                    },
                    {
                        id: 'D',
                        title: 'D',
                    },
                ],
            }),
        },
    },
    {
        id: 'driver_certificate',
        type: 'text',
        options: {
            placeholder: 'Водительское удостоверение',
        },
    },
    {
        id: 'car_id',
        type: 'menu',
        options: {
            placeholder: 'Авто',
            source: new Server({
                endpoint: 'cars',
                model: CarModel,
            }),
        },
    },
    {
        id: 'phone',
        type: 'text',
        options: {
            placeholder: 'Телефон',
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
