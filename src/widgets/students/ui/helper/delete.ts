import { deleteData } from 'shared/lib/action';
import { STUDENT_SOURCE } from '../Constants';

export const deleteStudent = (params: object) =>
    deleteData(STUDENT_SOURCE, params);
