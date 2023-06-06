import { Model } from 'shared/lib/source';

export class TimeModel extends Model {
    public get title() {
        return this.time_interval;
    }
}

export class DayModel extends Model {
    public get title() {
        return this.day_long;
    }
}
