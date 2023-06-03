import { editData } from 'shared/lib/action';
import { STUDENTS_DATA_FORM, STUDENT_SOURCE } from '../Constants';

export const editStudent = (
    data: object,
    afterCreate?: () => Promise<void>
) => {
    return editData(
        {
            modelDataForm: STUDENTS_DATA_FORM,
            source: STUDENT_SOURCE,
            data,
        },
        afterCreate
    );
};
