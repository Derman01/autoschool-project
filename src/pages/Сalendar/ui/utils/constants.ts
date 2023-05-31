import { Server } from 'shared/lib/source';
import { LessonModel } from '../../models/Model';

export const LESSON_SOURCE = new Server({
    endpoint: 'lessons',
    model: LessonModel,
});
