export const getDateString = (date: Date): string => {
    if (!date) {
        return '';
    }
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    console.log(date);
    // @ts-ignore
    return date?.toLocaleDateString('ru-RS', options);
};

type compare = 0 | -1 | 1;

export const compareTime = (date1: Date, date2: Date): compare => {
    const date1Hour = date1.getHours();
    const date2Hour = date2.getHours();

    const date1Min = date1.getMinutes();
    const date2Min = date1.getMinutes();

    if (date1Hour > date2Hour) {
        return 1;
    } else if (date1Hour < date2Hour) {
        return -1;
    }

    if (date1Min > date2Min) {
        return 1;
    } else if (date1Min < date2Min) {
        return -1;
    }
    return 0;
};
