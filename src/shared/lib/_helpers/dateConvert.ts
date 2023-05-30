export const getDateString = (date: string): string => {
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
    return new Date(date)?.toLocaleDateString('ru-RS', options);
};
