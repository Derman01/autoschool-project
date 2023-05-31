import { FC } from 'react';
import './styles/Lesson.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { LessonModel } from '../models/Model';

interface LessonOptions extends ComponentOptions {
    lesson: LessonModel;
}

export const Lesson: FC<LessonOptions> = (options) => {
    const { className, lesson } = options;

    return (
        <div className={classNames(['Lesson', className])}>
            <div className="Lesson__wrapper" title={lesson.Title}>
                <div className="Lesson__time">
                    {lesson.StartTimeString} - {lesson.EndTimeString}
                </div>
                <div className="Lesson__group">Группа {lesson.GroupName}</div>
                <div className="Lesson__name">{lesson.Title}</div>
            </div>
        </div>
    );
};
