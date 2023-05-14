import { FC, useCallback, useState } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { ListGroup } from 'widgets/groups';
import { LessonList, IFilter } from 'widgets/lesson';
import { classNames } from 'shared/lib/helpers';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const [filter, setFilter] = useState<IFilter>({});

    const changeFilter = useCallback((id: string) => {
        setFilter({
            group: id,
        });
    }, []);

    return (
        <div className={classNames(['page-calendar__page', className])}>
            <ListGroup
                dataLoadCallback={(items) => changeFilter(items[0].id)}
                selectedChanged={(item) => changeFilter(item.id)}
            />
            <LessonList
                filter={filter}
                className={'page-calendar__page_lessons'}
            />
        </div>
    );
};

export default Page;
