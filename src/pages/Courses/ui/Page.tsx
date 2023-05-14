import { FC } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { CoursesList } from 'widgets/courses';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;

    return (
        <div className={classNames(['pages-courses-Page', className])}>
            <CoursesList />
        </div>
    );
};

export default Page;
