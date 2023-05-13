import { TDataForm } from 'shared/ui/_form/Menu';
import { Server } from 'shared/lib/_source/Server';
import { GroupModel } from 'pages/Students/models/GroupModel';
import InstructorModel from 'pages/Students/models/InstructorModel';
import { CategoryModel } from 'pages/Students/models/CategoryModel';

export const GroupDataForm: TDataForm = [
    {
        id: 'name',
        type: 'text',
        options: {
            placeholder: 'Название',
        },
    },
    {
        id: 'studying_start_date',
        type: 'date',
        options: {
            placeholder: 'Дата начала обучения',
        },
    },
    {
        id: 'studying_end_date',
        type: 'date',
        options: {
            placeholder: 'Дата окончания обучения',
        },
    },
    {
        id: 'instructor_id',
        type: 'menu',
        options: {
            placeholder: 'Преподаватель теории',
            source: new Server({
                endpoint: 'instructors',
                model: InstructorModel,
            }),
        },
    },
    {
        id: 'examen_date',
        type: 'date',
        options: {
            placeholder: 'Дата внутренного экзамена',
        },
    },
    {
        id: 'course_id',
        type: 'menu',
        options: {
            placeholder: 'Категория',
            source: new Server({
                endpoint: 'courses',
                model: CategoryModel,
            }),
        },
    },
];

export const StudentDataForm: TDataForm = [
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
        id: 'birthday',
        type: 'date',
        options: {
            placeholder: 'Дата рождения',
        },
    },
    {
        id: 'phone',
        type: 'text',
        options: {
            placeholder: 'Телефон',
        },
    },
    {
        id: 'address',
        type: 'text',
        options: {
            placeholder: 'Адрес',
        },
    },
    {
        id: 'group_id',
        type: 'menu',
        options: {
            placeholder: 'Группа',
            source: new Server({
                endpoint: 'groups',
                model: GroupModel,
            }),
        },
    },
    {
        id: 'instructor_id',
        type: 'menu',
        options: {
            placeholder: 'Преподаватель по практике',
            source: new Server({
                endpoint: 'instructors',
                model: InstructorModel,
            }),
        },
    },
    {
        id: 'payment_needed',
        type: 'text',
        options: {
            placeholder: 'Оплата',
        },
    },
].splice(0) as TDataForm;

export const getDataStudentWithNewValue = (data: {
    [key: string | number]: any;
}) => {
    const result: { [key: string | number]: any } = {};
    StudentDataForm.forEach((value) => {
        result[value.id] = data[value.id];
    });
    return result;
};

const getDataWithValue = (defaultData: TDataForm, data: AnyObject) => {
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

export const getStudentDataWithValue = (data: AnyObject) => {
    return getDataWithValue(StudentDataForm, data);
};

export const getGroupDataWithValue = (data: AnyObject) => {
    return getDataWithValue(GroupDataForm, data);
};

type AnyObject = {
    [key: string | number]: any;
};
