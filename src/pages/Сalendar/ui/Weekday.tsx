import { FC, ReactElement, useMemo, useState } from 'react';
import './styles/Weekday.scss';
import { ComponentOptions } from 'shared/types';
import { classNames } from 'shared/lib/helpers';
import { Button } from 'shared/ui/buttons';
import { Day } from './Day';
import { LessonModel } from '../models/Model';

interface IDay {
    [date: string]: LessonModel[];
}

interface WeekdayOptions extends ComponentOptions {
    lessons: LessonModel[];
}

export const Weekday: FC<WeekdayOptions> = (options) => {
    const { className, lessons } = options;
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysMap = useMemo(() => {
        const days: IDay = {};
        lessons.forEach((lesson) => {
            const localDate = lesson.DateDay.toLocaleDateString();
            if (days[localDate]) {
                days[localDate].push(lesson);
            } else {
                days[localDate] = [lesson];
            }
        });
        return days;
    }, [lessons]);

    const handlePrevWeek = () => {
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setCurrentDate(prevWeek);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setCurrentDate(nextWeek);
    };

    const renderNamesDay = (day: Date) => {
        const formattedDate = `${day.getDate()} ${day.toLocaleString(
            'default',
            { month: 'short' }
        )}`;
        return (
            <div
                key={day.getTime()}
                className={classNames('weekday__day', {
                    current: day.toDateString() === new Date().toDateString(),
                })}
            >
                <div className="weekday__day__name">
                    {day.toLocaleString('ru-RU', {
                        weekday: 'short',
                    })}
                </div>
                <div className="weekday__day__date">{formattedDate}</div>
            </div>
        );
    };

    const renderTimes = (day: Date, times: boolean = false) => {
        return (
            <Day
                key={day.getTime()}
                visibleTime={times}
                lessons={daysMap[day.toLocaleDateString()]}
            />
        );
    };

    const renderCalendar = (renderDay: (date: Date) => ReactElement) => {
        const week = [];
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        for (let i = 1; i < 8; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            week.push(renderDay(day));
        }
        return week;
    };

    return (
        <div className={classNames(['Weekday', className])}>
            <div className="Weekday__controls">
                <div className="Weekday__controls__year">
                    {currentDate.toLocaleString('ru-RU', { year: 'numeric' })}
                </div>
                <div className="Weekday__controls__buttons">
                    <Button title={'Прошлая неделя'} onClick={handlePrevWeek} />
                    <Button
                        title={'Следующая неделя'}
                        onClick={handleNextWeek}
                    />
                </div>
            </div>
            <div className="Weekday__calendar">
                <div className="Weekday__calendar__names">
                    <div className="Weekday__calendar__names-fake"></div>
                    {renderCalendar(renderNamesDay)}
                </div>
                <div className="Weekday__calendar__times">
                    <div className="Weekday__calendar__times-fake">
                        {renderTimes(new Date(), true)}
                    </div>
                    {renderCalendar(renderTimes)}
                </div>
            </div>
        </div>
    );
};
