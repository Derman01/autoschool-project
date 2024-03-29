import { Model } from 'shared/lib/source';

export class LessonModel extends Model {
    public get DateDay(): Date {
        return new Date(this.date);
    }

    public get DateString(): string {
        return this.DateDay.toLocaleDateString('ru-Ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
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
        return this.StartTime.toLocaleString('ru-RU', {
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
        return this.EndTime.toLocaleString('ru-RU', {
            hour: 'numeric',
            minute: 'numeric',
        });
    }

    public get MovedDateString(): string {
        return new Date(this.moved_date).toLocaleDateString('ru-Ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }
}
export class TimingModel extends Model {
    public get title(): string {
        return this.time_interval;
    }
}
