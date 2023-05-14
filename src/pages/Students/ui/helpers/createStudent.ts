import { STUDENT_SOURCE, StudentDataForm } from './Constants';
import { createData } from 'shared/lib/action';

export const createStudent = (afterCreate: () => void) => {
    return createData(
        {
            modelDataForm: StudentDataForm,
            source: STUDENT_SOURCE,
            data: {
                photo_path: 'pic.txt',
            },
            headerTitle: 'Добавить студента',
        },
        afterCreate
    );
};
