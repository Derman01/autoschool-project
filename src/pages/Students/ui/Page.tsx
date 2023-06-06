import './styles/Page.scss';
import { FC, useState } from 'react';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { ListGroup, GroupModel } from 'widgets/groups';
import { StudentList } from 'widgets/students';

interface PageOptions extends ComponentOptions {}

export const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const [selectedGroup, setSelectedGroup] = useState<GroupModel>(null);
    const [filterStudents, setFilterStudents] = useState({});

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

    return (
        <div className={classNames(['page__students', className])}>
            <ListGroup
                dataLoadCallback={groupLoadCallback}
                selectedChanged={changeFolderHandler}
            />
            <StudentList
                group={selectedGroup}
                className={'page__students_student'}
                filter={filterStudents}
                headerTitle={
                    <>
                        Группа{': '}
                        <span className="page__students_detail_container_title-name">
                            {selectedGroup?.title}
                        </span>
                    </>
                }
            />
        </div>
    );
};

export default Page;
