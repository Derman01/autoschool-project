import { FC } from 'react';
import './styles/Lesson.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { LessonModel } from '../models/Model';
import { PopupOpener } from 'shared/ui/popup';
import { Card } from './Card';

interface LessonOptions extends ComponentOptions {
    lesson: LessonModel;
}

export const Lesson: FC<LessonOptions> = (options) => {
    const { className, lesson } = options;

    const openCard = () => {
        PopupOpener.createModal({
            templateOptions: {
                headerTitle: 'Карточка урока',
                width: 650,
                bodyContent: <Card lesson={lesson} />,
            },
        });
    };

    return (
        <div className={classNames(['Lesson', className])}>
            <div
                className="Lesson__wrapper"
                title={lesson.Title}
                onClick={openCard}
            >
                <div className="Lesson__time">
                    {lesson.StartTimeString} - {lesson.EndTimeString}
                </div>
                <div className="Lesson__group">Группа {lesson.GroupName}</div>
                <div className="Lesson__name">{lesson.Title}</div>
                <div className="Lesson__milk"></div>
            </div>
        </div>
    );
};
