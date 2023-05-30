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
