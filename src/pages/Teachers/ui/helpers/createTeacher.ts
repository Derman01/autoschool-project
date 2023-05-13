import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { TeacherDataForm } from './Constants';

export const createTeacher = (afterCreate: () => void) => {
    const onResult = (data: object) => {
        return new Server({
            endpoint: 'instructors',
        })
            .call('create', {
                ...data,
                job: 'null',
                photo_path: 'pic.png',
            })
            .then(() => afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Добавить инструктора',
        },
        {
            data: TeacherDataForm,
            onResult,
        }
    );
};
