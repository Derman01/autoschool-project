import { editData } from 'shared/lib/action';
import { LESSON_DATA_FORM, LESSON_SOURCE } from '../Constants';
import { convertDataFrom, convertDataTo } from './Constants';

export const editLesson = (data: object, afterCreate?: () => void) => {
    return editData(
        {
            modelDataForm: LESSON_DATA_FORM,
            source: LESSON_SOURCE,
            data,
            convertDataTo,
            convertDataFrom,
        },
        afterCreate
    );
};
