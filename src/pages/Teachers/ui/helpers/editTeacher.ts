import { TEACHER_SOURCE, TeacherDataForm } from './Constants';
import { editData } from 'shared/lib/action';
import { TeacherModel } from 'widgets/teacher';

export const editTeacher = (
    data: object,
    afterCreate?: (item: TeacherModel) => Promise<void>
) => {
    return editData(
        {
            data,
            modelDataForm: TeacherDataForm,
            source: TEACHER_SOURCE,
            convertDataTo: (value) => ({
                ...value,
                is_practician: value.is_practician ? 1 : 0,
            }),
        },
        afterCreate
    );
};
