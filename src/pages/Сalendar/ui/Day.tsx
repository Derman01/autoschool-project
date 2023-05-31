import { FC, ReactElement } from 'react';
import './styles/Day.scss';
import { ComponentOptions } from 'shared/types';
import { classNames, compareTime } from 'shared/lib/helpers';
import { LessonModel } from '../models/Model';
import { Lesson } from './Lesson';

interface DayOptions extends ComponentOptions {
    visibleTime?: boolean;
    lessons: LessonModel[];
}

export const Day: FC<DayOptions> = (options) => {
    const { className, visibleTime, lessons } = options;

    const events = lessons ? [...lessons] : [];

    const fakeTime = (day: Date) => {
        const formattedTime = day.toLocaleString('default', {
            hour: 'numeric',
            minute: 'numeric',
        });
        return (
            <div key={day.getTime()} className="half-hour">
                {visibleTime && (
                    <div className="time-label">{formattedTime}</div>
                )}
            </div>
        );
    };

    const Block = (
        { children, span }: { children?: ReactElement; span?: number } = {
            span: 1,
        }
    ) => (
        <div
            className="half-hour"
            style={{
                gridRow: `span ${span}`,
            }}
        >
            {children}
        </div>
    );

    const renderHours = () => {
        const hours = [];
        const startDate = new Date();

        startDate.setHours(9, 0);

        let iter = 0;
        while (iter < 28) {
            const halfHour = new Date(startDate);
            halfHour.setMinutes(startDate.getMinutes() + 30 * iter);

            if (visibleTime) {
                hours.push(fakeTime(halfHour));
            } else {
                const event = events?.[0];
                if (event) {
                    const { StartTime: start, EndTime: end } = event;

                    const endTime = end.getHours() * 60 + end.getMinutes();
                    const startTime =
                        start.getHours() * 60 + start.getMinutes();
                    const span = (endTime - startTime) / 30;

                    if (compareTime(start, halfHour) === 0) {
                        iter += span - 1;
                        hours.push(
                            <Block span={span} key={iter}>
                                <Lesson lesson={event} />
                            </Block>
                        );
                        events.shift();
                    } else {
                        hours.push(<Block key={iter} />);
                    }
                } else {
                    hours.push(<Block key={iter} />);
                }
            }
            iter += 1;
        }

        return <div className="half-hours">{hours}</div>;
    };

    return (
        <div className={classNames(['Day', className])}>{renderHours()}</div>
    );
};
