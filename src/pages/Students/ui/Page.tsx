import './styles/Page.scss';
import { FC, useRef, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames, getDateString } from 'shared/lib/helpers';
import { IViewRef, View } from 'shared/ui/list';
import { Button } from 'shared/ui/buttons';
import { Actions } from 'widgets/action';
import { ListGroup, GroupModel } from 'widgets/groups';
import { createStudent } from './helpers/createStudent';
import { deleteStudent } from './helpers/deleteStudent';
import { editStudent } from './helpers/editStudent';
import { SOURCE_STUDENTS } from './Constants';
import { ItemTemplateStudent } from './templates/ItemTemplateStudent';
import { StudentModel } from '../models/StudentModel';
import { PopupOpener } from 'shared/ui/popup';
import { PaymentList } from 'widgets/payments';
import { downloadFile } from 'shared/lib/source';
import { ListExam } from 'widgets/exams';

interface PageOptions extends ComponentOptions {}

export const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const [selectedGroup, setSelectedGroup] = useState<GroupModel>(null);
    const [filterStudents, setFilterStudents] = useState({});

    const studentsRef = useRef<IViewRef>(null);

    const groupLoadCallback = (items: GroupModel[]) => {
        setSelectedGroup(items?.[0]);
        setFilterStudents({
            group: items[0].id,
        });
    };

    const changeFolderHandler = (item: GroupModel) => {
        setFilterStudents({
            group: item.id,
        });
        setSelectedGroup(item);
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
            id: 'exams',
            title: 'Открыть список экзаменов',
            handler: (item: StudentModel) => {
                PopupOpener.createModal({
                    templateOptions: {
                        width: 700,
                        headerTitle: 'Экзамены студента ' + item.ShortName,
                        bodyContent: <ListExam studentId={item.id} />,
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
                    title: 'Карточка учета вождения автомобиля',
                    handler: (item) => {
                        downloadFile('car-driving-registration-card', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-1',
                    title: 'Экзаменационная карточка водителя',
                    handler: (item) => {
                        downloadFile('driver-exam-card', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-2',
                    title: 'Акт на оказание услуг',
                    handler: (item) => {
                        downloadFile('service-delivery-act', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-3',
                    title: 'Акт о выполнении услуги',
                    handler: (item) => {
                        downloadFile('service-performance-act', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
                },
                {
                    id: 'print-4',
                    title: 'Путевой лист',
                    handler: (item) => {
                        downloadFile('waybill', {
                            student_id: item.id,
                        });
                        return Promise.resolve();
                    },
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
                            Группа{': '}
                            <span className="page__students_detail_container_title-name">
                                {selectedGroup?.title}
                            </span>
                            {'; '}
                            Категория прав{': '}
                            <span className="page__students_detail_container_title-name">
                                {selectedGroup?.course_category}
                            </span>
                            {'; '}
                            Старт обучения{': '}
                            <span className="page__students_detail_container_title-name">
                                {getDateString(
                                    selectedGroup?.studying_start_date
                                )}
                            </span>
                            {'; '}
                            Тип группы{': '}
                            <span className="page__students_detail_container_title-name">
                                {selectedGroup?.timing_type}
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
