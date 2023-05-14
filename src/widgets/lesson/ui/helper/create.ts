import { createData } from 'shared/lib/action';
import { LESSON_DATA_FORM, LESSON_SOURCE } from '../Constants';
import { convertDataFrom } from './Constants';

export const createLesson = (afterCreate: () => void) =>
    createData(
        {
            headerTitle: 'Добавить урок',
            source: LESSON_SOURCE,
            modelDataForm: LESSON_DATA_FORM,
            convertDataFrom: convertDataFrom,
        },
        afterCreate
    );
