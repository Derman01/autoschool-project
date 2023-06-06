import { FC, useRef } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { IViewRef, RichGrid } from 'shared/ui/list';
import { Server } from 'shared/lib/source';
import TeacherModel from '../models/TeacherModel';
import { createTeacher } from './helpers/createTeacher';
import { PopupOpener } from 'shared/ui/popup';
import { Card } from './Card';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const listRef = useRef<IViewRef>(null);

    const source = new Server({
        endpoint: 'instructors',
        model: TeacherModel,
    });

    const openCardTeacher = (teacher: TeacherModel) => {
        PopupOpener.createModal({
            templateOptions: {
                headerTitle: 'Карточка преподавателя',
                width: 700,
                bodyContent: (
                    <Card
                        teacher={teacher}
                        afterUpdate={listRef.current.reload}
                    />
                ),
            },
        });
    };

    return (
        <div className={classNames(['page__teacher', className])}>
            <RichGrid
                ref={listRef}
                headerTitle={'Преподавательский состав'}
                addingCallback={() => createTeacher(listRef.current.reload)}
                gridOptions={{
                    source,
                    canSelected: false,
                    selectedChanged: openCardTeacher,
                    captions: [
                        {
                            width: '4fr',
                            title: 'ФИО',
                        },
                        {
                            width: '1fr',
                            title: 'Номер телефона',
                        },
                    ],
                    columns: [
                        (item: TeacherModel) => (
                            <div
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <div className="page__teacher_list__item_photo">
                                    {item.surname[0]}
                                    {item.name[0]}
                                </div>
                                <div className="page__teacher_list__item_info">
                                    <div className="page__teacher_list__item_info_name">
                                        {item.FullName}
                                    </div>
                                    <div className="page__teacher_list__item_info_job">
                                        {item.job}
                                    </div>
                                </div>
                            </div>
                        ),
                        (item: TeacherModel) => <>{item.PhoneNumber}</>,
                    ],
                }}
            />
        </div>
    );
};

export default Page;
