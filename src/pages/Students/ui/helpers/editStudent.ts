import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { getStudentDataWithValue } from './Constants';

export const editStudent = (data: object, afterCreate?: () => void) => {
    const onResult = (newData: object) => {
        return new Server({
            endpoint: 'students',
        })
            .call('update', {
                ...data,
                ...newData,

                gearbox_type: 'manual',
                photo_path: 'pic.txt',
            })
            .then(() => afterCreate && afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Редактировать студента',
        },
        {
            data: getStudentDataWithValue(data),
            onResult,
            buttonActionText: 'Редактировать',
        }
    );
};
