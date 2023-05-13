import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { StudentDataForm } from 'pages/Students/ui/helpers/Constants';

export const createStudent = (afterCreate: () => void) => {
    const onResult = (data: object) => {
        return new Server({
            endpoint: 'students',
        })
            .call('create', {
                ...data,
                gearbox_type: 'manual',
                photo_path: 'pic.txt',
            })
            .then(() => afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Добавить студента',
        },
        {
            data: StudentDataForm,
            onResult,
        }
    );
};
