import { Model } from 'shared/lib/source';

export class LessonModel extends Model {
    public get DateDay(): Date {
        return new Date(this.date);
    }

    public get Title(): string {
        return this.title;
    }

    public get GroupName(): string {
        return this.group_name;
    }

    public get StartTime(): Date {
        const [hour, min] = this.timing_start.split(':');
        const time = new Date(this.date);
        time.setHours(hour, min);
        return time;
    }

    public get StartTimeString(): string {
        return this.StartTime.toLocaleString('default', {
            hour: 'numeric',
            minute: 'numeric',
        });
    }

    public get EndTime(): Date {
        const [hour, min] = this.timing_end.split(':');
        const time = new Date(this.date);
        time.setHours(hour, min);
        return time;
    }

    public get EndTimeString(): string {
        return this.EndTime.toLocaleString('default', {
            hour: 'numeric',
            minute: 'numeric',
        });
    }
}
