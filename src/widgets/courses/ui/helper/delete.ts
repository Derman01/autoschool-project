import { deleteData } from 'shared/lib/action';
import { COURSES_SOURCE } from '../Constants';

export const deleteCourse = (params: object) =>
    deleteData(COURSES_SOURCE, params);
