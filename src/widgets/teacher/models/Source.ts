import { Server } from 'shared/lib/source';
import { TeacherModel } from './Model';

export const TEACHER_SOURCE = new Server({
    endpoint: 'instructors',
    model: TeacherModel,
});
