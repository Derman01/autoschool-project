import { createData } from 'shared/lib/action';
import { COURSES_DATA_FORM, COURSES_SOURCE } from '../Constants';

export const createCourse = (afterCreate: () => void) =>
    createData(
        {
            headerTitle: 'Добавить курс',
            source: COURSES_SOURCE,
            modelDataForm: COURSES_DATA_FORM,
        },
        afterCreate
    );
