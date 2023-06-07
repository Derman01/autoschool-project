import { FC, useCallback, useState } from 'react';
import './styles/Card.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { GroupModel } from '../models/Model';
import { Button } from 'shared/ui/buttons';
import { Info } from 'shared/ui/form';
import { usePopupContext } from 'shared/hooks/usePopupContext';
import { deleteGroup } from './helper/deleteGroup';
import { LessonModel } from 'pages/Сalendar/models/Model';
import { downloadFile, IItemData, Memory } from 'shared/lib/source';
import { PopupOpener } from 'shared/ui/_popup/PopupOpener';
import { View } from 'shared/ui/_list/View';

interface CardOptions extends ComponentOptions {
    group: GroupModel;
    afterUpdate: () => Promise<void>;
    lessons: LessonModel[];
}

export const Card: FC<CardOptions> = (options) => {
    const { className, afterUpdate, lessons } = options;
    const [groupModel] = useState(options.group);
    const { closePopup } = usePopupContext();

    const practicExam = lessons.find(
        (lesson) => lesson.module_name === 'Практический экзамен'
    );
    const teoreticExam = lessons.find(
        (lesson) => lesson.module_name === 'Теоретический экзамен'
    );

    const onDeleteHandler = useCallback(() => {
        deleteGroup(groupModel).then(() => {
            afterUpdate().then(() => {
                closePopup();
            });
        });
    }, [groupModel]);

    const printDocument = (item: IItemData) => {
        downloadFile(item.id, {
            group_id: groupModel.id,
        });
    };

    const sourcePrint = new Memory({
        data: [
            {
                id: 'exam-protocol',
                name: 'Экзаменационный протокол',
            },
            {
                id: 'registration-order',
                name: 'Заявление на регистрацию в ГИБДД',
            },
            {
                id: 'exam-results',
                name: 'Справка о результатах экзамена ГИБДД',
            },
            {
                id: 'group-debt',
                name: 'Список должников',
            },
            {
                id: 'schedule',
                name: 'Расписание',
            },
        ],
    });

    const openPanelDoc = () => {
        PopupOpener.createModal({
            templateOptions: {
                width: 500,
                headerTitle: 'Печать документов',
                bodyContent: (
                    <View
                        source={sourcePrint}
                        selectedChanged={printDocument}
                        canHover={true}
                        canSelected={false}
                    />
                ),
            },
        });
    };

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
                    style={'unaccented'}
                    title={'Печать документов'}
                    onClick={openPanelDoc}
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
