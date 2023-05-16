import { EXAM_SOURCE, ExamDataForm } from './Constants';
import { editData } from 'shared/lib/action';

export const edit = (data: object, afterCreate?: () => void) => {
    return editData(
        {
            data,
            source: EXAM_SOURCE,
            modelDataForm: ExamDataForm,
        },
        afterCreate
    );
};
