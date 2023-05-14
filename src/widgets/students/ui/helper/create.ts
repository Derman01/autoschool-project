import { createData } from 'shared/lib/action';
import { STUDENTS_DATA_FORM, STUDENT_SOURCE } from '../Constants';

export const createStudent = (afterCreate: () => void) =>
    createData(
        {
            headerTitle: 'Добавить студента',
            source: STUDENT_SOURCE,
            modelDataForm: STUDENTS_DATA_FORM,
        },
        afterCreate
    );
