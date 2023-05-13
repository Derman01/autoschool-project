import './styles/Page.scss';
import { FC, useRef, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { IViewRef, View } from 'shared/ui/list';
import { SOURCE_GROUPS, SOURCE_STUDENTS } from './Constants';
import { ItemTemplateStudent } from './templates/ItemTemplateStudent';
import { Button } from 'shared/ui/buttons';
import { createGroup } from './helpers/createGroup';
import { createStudent } from 'pages/Students/ui/helpers/createStudent';
import { Actions } from 'widgets/action';
import { deleteStudent } from 'pages/Students/ui/helpers/deleteStudent';
import { editStudent } from 'pages/Students/ui/helpers/editStudent';
import { deleteGroup } from 'pages/Students/ui/helpers/deleteGroup';
import { editGroup } from 'pages/Students/ui/helpers/editGroup';

interface PageOptions extends ComponentOptions {}

export const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const [selectedGroup, setSelectedGroup] = useState('');
    const [filterStudents, setFilterStudents] = useState({});

    const groupRef = useRef<IViewRef>(null);
    const studentsRef = useRef<IViewRef>(null);

    const groupLoadCallback = (items: { name: string; id: string }[]) => {
        setSelectedGroup(items[0].name);
        setFilterStudents({
            group: items[0].id,
        });
    };

    const changeFolderHandler = (item: { id: string; name: string }) => {
        setFilterStudents({
            group: item.id,
        });
        setSelectedGroup(item.name);
    };

    const studentActions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                editStudent(item, studentsRef.current.reload);
                return Promise.resolve();
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteStudent({
                    studentId: item['id'],
                    groupId: item['group_id'],
                }).then(() => {
                    return studentsRef.current.reload();
                });
            },
        },
        {
            id: 'print',
            title: 'Распечатать документ',
            children: [
                {
                    id: 'print-0',
                    title: 'Акт о выполнении и оказания услуг по договору',
                },
                {
                    id: 'print-1',
                    title: 'Экзаменационная карточка водителя',
                },
                {
                    id: 'print-2',
                    title: 'Заявление в ГИБДД на получение государственной услуги экзамен - получение прав',
                },
            ],
        },
    ];

    const groupActions: Actions = [
        {
            id: 'edit',
            title: 'Редактировать',
            handler: (item) => {
                editGroup(item, groupRef.current.reload);
                return Promise.resolve();
            },
        },
        {
            id: 'delete',
            title: 'Удалить',
            handler: (item) => {
                return deleteGroup({
                    id: item['id'],
                }).then(() => {
                    return groupRef.current.reload();
                });
            },
        },
        {
            id: 'print',
            title: 'Распечатать документ',
            children: [
                {
                    id: 'print-1',
                    title: 'Экзаменационный протокол',
                },
                {
                    id: 'print-2',
                    title: 'Справка о результатах экзамена ГИБДД',
                },
                {
                    id: 'print-3',
                    title: 'Заявление в ГИБДД на получение государственной услуги экзамен - получение прав',
                },
            ],
        },
    ];

    return (
        <div className={classNames(['page__students', className])}>
            <div className="page__students_groups">
                <div className="page__students_groups_header">
                    <div className="page__students_groups_title">Группы</div>
                    <Button
                        iconSize={'m'}
                        icon={'plus'}
                        viewMode={'icon'}
                        onClick={() => createGroup(groupRef.current.reload)}
                    />
                </div>

                <View
                    actions={groupActions}
                    ref={groupRef}
                    source={SOURCE_GROUPS}
                    className={classNames('page__students_groups_list')}
                    dataLoadCallback={groupLoadCallback}
                    selectedChanged={changeFolderHandler}
                    minWidth={300}
                    keyProperty={'id'}
                    style={'master'}
                    templateItem={({
                        name,
                        count,
                    }: {
                        name: string;
                        count: number;
                    }) => (
                        <div className={'page__students_groups__item'}>
                            <div>{name}</div>
                            <div
                                className={'page__students_groups__item_count'}
                            >
                                {count}
                            </div>
                        </div>
                    )}
                />
            </div>
            <div className="page__students_detail_container">
                <div className="page__students_detail_container_header">
                    {
                        <div className="page__students_detail_container_title">
                            Группа
                            <span
                                className={
                                    'page__students_detail_container_title-name'
                                }
                            >
                                {' '}
                                {selectedGroup}
                            </span>
                        </div>
                    }
                    <Button
                        icon={'plus'}
                        viewMode={'icon'}
                        iconSize={'m'}
                        onClick={() =>
                            createStudent(studentsRef.current.reload)
                        }
                    />
                </div>
                <div className="page__students_detail_headers">
                    <div>ФИО</div>
                    <div>Категории прав</div>
                    <div>Оставшаяся плата</div>
                </div>
                <View
                    actions={studentActions}
                    ref={studentsRef}
                    className={classNames('page__students_detail')}
                    source={SOURCE_STUDENTS}
                    canSelected={false}
                    filter={filterStudents}
                    horizontalPaddings={'xs'}
                    templateItem={ItemTemplateStudent}
                />
            </div>
        </div>
    );
};

export default Page;
