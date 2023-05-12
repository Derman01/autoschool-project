import './styles/Page.scss';
import { FC, useRef, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { IViewRef, View } from 'shared/ui/list';
import {
    FILTER_GROUP_INITIAL_STATE,
    SOURCE_GROUPS,
    SOURCE_STUDENTS,
} from './Constants';
import { ItemTemplateStudent } from './templates/ItemTemplateStudent';
import { Button } from 'shared/ui/buttons';
import { createGroup } from './helpers/createGroup';
import { createStudent } from 'pages/Students/ui/helpers/createStudent';

interface PageOptions extends ComponentOptions {}

export const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const [selectedGroup, setSelectedGroup] = useState('');
    const [filterStudents, setFilterStudents] = useState(
        FILTER_GROUP_INITIAL_STATE
    );

    const groupRef = useRef<IViewRef>(null);
    const studentsRef = useRef<IViewRef>(null);

    const groupLoadCallback = (items: { name: string }[]) => {
        setSelectedGroup(items[0].name);
    };

    const changeFolderHandler = (item: { id: string; name: string }) => {
        setFilterStudents({
            group: item.id,
        });
        setSelectedGroup(item.name);
    };

    const afterCreateGroup = () => {
        groupRef.current.reload();
    };
    const afterCreateStudent = () => {
        studentsRef.current.reload();
    };

    return (
        <div className={classNames(['page__students', className])}>
            <div className="page__students_groups">
                <div className="page__students_groups_header">
                    <div className="page__students_groups_title">Группы</div>
                    <Button
                        iconSize={'m'}
                        icon={'plus'}
                        viewMode={'icon'}
                        onClick={() => createGroup(afterCreateGroup)}
                    />
                </div>

                <View
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
                        onClick={() => createStudent(afterCreateStudent)}
                    />
                </div>
                <div className="page__students_detail_headers">
                    <div>ФИО</div>
                    <div>Категории прав</div>
                    <div>Оставшаяся плата</div>
                </div>
                <View
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
