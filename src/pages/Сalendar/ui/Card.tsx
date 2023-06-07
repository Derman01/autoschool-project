import { FC, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { LessonModel, TimingModel } from '../models/Model';
import { Button } from 'shared/ui/buttons';
import { Info, TDataForm } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { editData } from 'shared/lib/action';
import { Server } from 'shared/lib/source';
import { LESSON_SOURCE } from 'pages/Сalendar/ui/utils/constants';

interface CardOptions extends ComponentOptions {
    lesson: LessonModel;
}

export const Card: FC<CardOptions> = (options) => {
    const { className } = options;
    const [lessonModel, setLessonModel] = useState(options.lesson);
    const { closePopup } = usePopupContext();

    const movedLesson = () => {
        const data: TDataForm = [
            {
                id: 'id',
                type: 'text',
                options: {
                    value: lessonModel.id,
                    placeholder: '',
                },
                dependence: {
                    id: 'null',
                },
            },
            {
                id: 'module_id',
                type: 'text',
                options: {
                    value: lessonModel.module_id,
                    placeholder: '',
                },
                dependence: {
                    id: 'null',
                },
            },
            {
                id: 'group_id',
                type: 'text',
                options: {
                    value: lessonModel.group_id,
                    placeholder: '',
                },
                dependence: {
                    id: 'null',
                },
            },
            {
                id: 'group_id',
                type: 'text',
                options: {
                    value: lessonModel.group_id,
                    placeholder: '',
                },
                dependence: {
                    id: 'null',
                },
            },
            {
                id: 'moved_date',
                type: 'date',
                options: {
                    required: true,
                    placeholder: 'Дата',
                },
            },
            {
                id: 'moved_time',
                type: 'time',
                options: {
                    placeholder: 'Время',
                    required: true,
                },
            },
        ];

        editData(
            {
                modelDataForm: data,
                width: 500,
                source: LESSON_SOURCE,
                headerTitle: 'Перенос даты занятий',
            },
            (data) => {
                return Promise.resolve().then(() => {
                    setLessonModel(new LessonModel(data));
                });
            }
        );
    };

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title:
                            'Дата проведения' +
                            (lessonModel.moved_date ? ' (Измененно)' : ''),
                        value: lessonModel.moved_date
                            ? lessonModel.MovedDateString
                            : lessonModel.DateString,
                    },
                    {
                        title:
                            'Время проведения' +
                            (lessonModel.moved_date ? ' (Измененно)' : ''),
                        value: lessonModel.moved_date
                            ? lessonModel.moved_time
                                  .split(':')
                                  .slice(0, 2)
                                  .join(':')
                            : lessonModel.timing_time_interval,
                    },
                    {
                        title: 'Группа',
                        value: lessonModel.group_name,
                    },
                    {
                        title: 'Название',
                        value: lessonModel.title,
                    },
                    {
                        title: 'Описание',
                        value: (
                            <>
                                {lessonModel.module_description
                                    .split('\n')
                                    .map((row: string, index: number) => (
                                        <span key={index}>
                                            {row}
                                            <br />
                                        </span>
                                    ))}
                            </>
                        ),
                    },
                ]}
            />
            <div className="widget-module__Card_actions">
                {!lessonModel.moved_date && (
                    <Button
                        style={'danger'}
                        title={'Перенести'}
                        onClick={movedLesson}
                    />
                )}
            </div>
        </div>
    );
};
