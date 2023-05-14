import { STUDENT_SOURCE, StudentDataForm } from './Constants';
import { editData } from 'shared/lib/action';

export const editStudent = (data: object, afterCreate?: () => void) => {
    return editData(
        {
            data: {
                ...data,
                gearbox_type: 'manual',
                photo_path: 'pic.txt',
            },
            source: STUDENT_SOURCE,
            modelDataForm: StudentDataForm,
        },
        afterCreate
    );
};
