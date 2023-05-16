import { Model } from 'shared/lib/source';

export class LessonModel extends Model {
    public get time(): string {
        let [, timeStart] = this.time_start.split(' ');
        let [, timeEnd] = this.time_end.split(' ');
        timeStart = timeStart.split(':').slice(0, 2).join(':');
        timeEnd = timeEnd.split(':').slice(0, 2).join(':');
        return `${timeStart} - ${timeEnd}`;
    }

    public get date(): string {
        return this.time_start.split(' ')[0];
    }
}
