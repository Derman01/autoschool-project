import { FC, useEffect, useState } from 'react';
import './styles/Page.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { LESSON_SOURCE } from './utils/constants';
import { LessonModel } from '../models/Model';
import { Weekday } from './Weekday';

interface PageOptions extends ComponentOptions {}

const Page: FC<PageOptions> = (options) => {
    const { className } = options;
    const [lessons, setLessons] = useState<LessonModel[]>([]);

    useEffect(() => {
        LESSON_SOURCE.query().then((lessons: LessonModel[]) => {
            setLessons(lessons);
        });
    }, []);

    return (
        <div className={classNames(['page-calendar__page', className])}>
            <Weekday lessons={lessons} />
        </div>
    );
};

export default Page;
