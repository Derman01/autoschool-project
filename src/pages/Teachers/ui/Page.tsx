import { FC, useRef } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { IViewRef, View } from 'shared/ui/list';
import { Server } from 'shared/lib/source';
import TeacherModel from '../models/TeacherModel';
import { Button } from 'shared/ui/buttons';
import { Actions } from 'widgets/action';
import { editTeacher } from './helpers/editTeacher';
import { createTeacher } from './helpers/createTeacher';
import { deleteTeacher } from './helpers/deleteTeacher';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const listRef = useRef<IViewRef>(null);

    const source = new Server({
        endpoint: 'instructors',
        model: TeacherModel,
    });

    const actions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                editTeacher(item, listRef.current.reload);
                return Promise.resolve();
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteTeacher(item).then(() => {
                    return listRef.current.reload();
                });
            },
        },
        {
            id: 'print',
            title: 'Респечатать путевой лист',
        },
    ];

    return (
        <div className={classNames(['page__teacher', className])}>
            <div className="page__teacher_container">
                <div className="page__teacher_container__header">
                    <div className="page__teacher_container__header_title">
                        Преподавательский состав
                    </div>
                    <Button
                        icon={'plus'}
                        viewMode={'icon'}
                        iconSize={'m'}
                        onClick={() => createTeacher(listRef.current.reload)}
                    />
                </div>
                <div className="page__teacher_list__header">
                    <div>ФИО</div>
                    <div>Номер телефона</div>
                </div>
                <View
                    actions={actions}
                    ref={listRef}
                    source={source}
                    canSelected={false}
                    horizontalPaddings={'xs'}
                    templateItem={(item: TeacherModel) => (
                        <div className={'page__teacher_list__item'}>
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
                            <div className="page__teacher_list__item_phone">
                                {item.PhoneNumber}
                            </div>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default Page;
