import { deleteData } from 'shared/lib/action';
import { LESSON_SOURCE } from 'widgets/lesson';

export const deleteLesson = (params: object) =>
    deleteData(LESSON_SOURCE, params);
