import { EXAM_SOURCE, ExamDataForm } from './Constants';
import { createData } from 'shared/lib/action';

export const create = (
    student_id: string,
    afterCreate: () => Promise<void>
) => {
    return createData(
        {
            headerTitle: 'Добавить экзамен',
            source: EXAM_SOURCE,
            convertDataFrom: (data) => ({ ...data, student_id }),
            modelDataForm: ExamDataForm,
        },
        afterCreate
    );
};
