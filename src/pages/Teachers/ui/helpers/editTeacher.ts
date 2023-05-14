import { TEACHER_SOURCE, TeacherDataForm } from './Constants';
import { editData } from 'shared/lib/action';

export const editTeacher = (data: object, afterCreate?: () => void) => {
    return editData(
        {
            data,
            modelDataForm: TeacherDataForm,
            source: TEACHER_SOURCE,
        },
        afterCreate
    );
};
