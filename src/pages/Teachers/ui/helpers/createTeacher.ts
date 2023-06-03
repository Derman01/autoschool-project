import { TEACHER_SOURCE, TeacherDataForm } from './Constants';
import { createData } from 'shared/lib/action';

export const createTeacher = (afterCreate: () => Promise<void>) => {
    return createData(
        {
            data: {
                job: 'null',
                photo_path: 'pic.png',
            },
            modelDataForm: TeacherDataForm,
            source: TEACHER_SOURCE,
            headerTitle: 'Добавить инструктора',
        },
        afterCreate
    );
};
