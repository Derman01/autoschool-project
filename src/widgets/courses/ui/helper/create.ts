import { createData } from 'shared/lib/action';
import { COURSES_DATA_FORM, COURSES_SOURCE } from '../Constants';

export const createCourse = (afterCreate: () => Promise<void>) =>
    createData(
        {
            headerTitle: 'Добавить курс',
            source: COURSES_SOURCE,
            width: 600,
            modelDataForm: COURSES_DATA_FORM,
        },
        afterCreate
    );
