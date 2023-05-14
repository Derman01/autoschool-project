import { AnyObject } from 'shared/lib/_actions/helper';

export const convertDataFrom = (data: AnyObject) => {
    const time_start = `${data.date}T${data['time-start']}`;
    const time_end = `${data.date}T${data['time-end']}`;

    return {
        ...data,
        time_end,
        time_start,
    };
};

export const convertDataTo = (data: AnyObject) => {
    let [date, timeStart] = data.time_start.split(' ');
    let [_, timeEnd] = data.time_end.split(' ');
    timeStart = timeStart.split(':').slice(0, 2).join(':');
    timeEnd = timeEnd.split(':').slice(0, 2).join(':');

    return {
        ...data,
        date,
        'time-start': timeStart,
        'time-end': timeEnd,
    };
};
