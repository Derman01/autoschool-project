import { EXAM_SOURCE, ExamDataForm } from './Constants';
import { editData } from 'shared/lib/action';

export const edit = (data: object, afterCreate?: () => Promise<void>) => {
    return editData(
        {
            data,
            source: EXAM_SOURCE,
            modelDataForm: ExamDataForm,
        },
        afterCreate
    );
};
