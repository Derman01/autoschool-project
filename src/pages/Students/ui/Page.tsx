import './styles/Page.scss';
import { FC, useRef, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { IViewRef, View } from 'shared/ui/list';
import { Button } from 'shared/ui/buttons';
import { Actions } from 'widgets/action';
import { ListGroup } from 'widgets/groups';
import { createStudent } from './helpers/createStudent';
import { deleteStudent } from './helpers/deleteStudent';
import { editStudent } from './helpers/editStudent';
import { SOURCE_STUDENTS } from './Constants';
import { ItemTemplateStudent } from './templates/ItemTemplateStudent';
import { StudentModel } from '../models/StudentModel';
import { PopupOpener } from 'shared/ui/popup';
import { PaymentList } from 'widgets/payments';

interface PageOptions extends ComponentOptions {}

export const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const [selectedGroup, setSelectedGroup] = useState('');
    const [filterStudents, setFilterStudents] = useState({});

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
                return editStudent(item, studentsRef.current.reload);
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
            id: 'payments',
            title: 'Открыть платежи',
            handler: (item: StudentModel) => {
                PopupOpener.createModal({
                    templateOptions: {
                        width: 700,
                        headerTitle: 'Платежи студента ' + item.ShortName,
                        bodyContent: (
                            <PaymentList
                                filter={{
                                    student_id: item.id,
                                }}
                            />
                        ),
                    },
                });
                return Promise.resolve();
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

    return (
        <div className={classNames(['page__students', className])}>
            <ListGroup
                dataLoadCallback={groupLoadCallback}
                selectedChanged={changeFolderHandler}
            />
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
