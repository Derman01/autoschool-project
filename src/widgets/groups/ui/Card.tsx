import { FC, useCallback, useState } from 'react';
import './styles/Card.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { GroupModel } from '../models/Model';
import { Button } from 'shared/ui/buttons';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { deleteGroup } from './helper/deleteGroup';
import { editGroup } from './helper/editGroup';
import { LessonModel } from 'pages/Сalendar/models/Model';

interface CardOptions extends ComponentOptions {
    group: GroupModel;
    afterUpdate: () => Promise<void>;
    lessons: LessonModel[];
}

export const Card: FC<CardOptions> = (options) => {
    const { className, afterUpdate, lessons } = options;
    const [groupModel, setGroupModel] = useState(options.group);
    const { closePopup } = usePopupContext();

    const practicExam = lessons.find(
        (lesson) => lesson.module_name === 'Практический экзамен'
    );
    const teoreticExam = lessons.find(
        (lesson) => lesson.module_name === 'Теоретический экзамен'
    );

    const onEditHandler = useCallback(() => {
        editGroup(groupModel, (item: GroupModel) => {
            setGroupModel(
                (module) =>
                    new GroupModel({
                        ...module,
                        ...item,
                    })
            );
            return afterUpdate();
        });
    }, [groupModel]);

    const onDeleteHandler = useCallback(() => {
        deleteGroup(groupModel).then(() => {
            afterUpdate().then(() => {
                closePopup();
            });
        });
    }, [groupModel]);

    return (
        <div className={classNames(['widget-module__Card', className])}>
            <Info
                data={[
                    {
                        title: 'Название группы',
                        value: groupModel.title,
                    },
                    {
                        title: 'Категория обучения',
                        value: groupModel.category_name,
                    },
                    {
                        title: 'Курс обучения',
                        value: groupModel.course_name,
                    },
                    {
                        title: 'Период обучения',
                        value:
                            groupModel.StartDate + ' - ' + groupModel.EndDate,
                    },
                    {
                        title: 'Тип группы',
                        value: groupModel.Type,
                    },
                    {
                        title: 'Время занятий',
                        value: groupModel.timing_time_interval,
                    },
                    {
                        title: 'Ак. часов практики',
                        value: groupModel.course_driving_hours,
                    },
                    {
                        title: 'Дата практического экзамена',
                        value: practicExam.DateString,
                    },
                    {
                        title: 'Дата теоретического экзамена',
                        value: teoreticExam.DateString,
                    },
                ]}
            />
            <div className="widget-module__Card_actions">
                <Button
                    style={'primary'}
                    title={'Редактировать'}
                    onClick={onEditHandler}
                />
                <Button
                    style={'danger'}
                    title={'Удалить'}
                    onClick={onDeleteHandler}
                />
            </div>
        </div>
    );
};
