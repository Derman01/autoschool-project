import { OpenForm } from 'shared/ui/form';
import { Server } from 'shared/lib/source';
import { getDataWithValue, TeacherDataForm } from './Constants';

export const editTeacher = (data: object, afterCreate?: () => void) => {
    const onResult = (newData: object) => {
        return new Server({
            endpoint: 'instructors',
        })
            .call('update', {
                ...data,
                ...newData,
            })
            .then(() => afterCreate && afterCreate());
    };

    OpenForm(
        {
            width: 430,
            headerTitle: 'Редактирование',
        },
        {
            data: getDataWithValue(TeacherDataForm, data),
            onResult,
            buttonActionText: 'Редактировать',
        }
    );
};
