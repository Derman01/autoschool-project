import { Model } from 'shared/lib/source';
import { getDateString } from 'shared/lib/helpers';

export class GroupModel extends Model {
    public get title() {
        return this.name;
    }

    public get StartDate(): string {
        return getDateString(new Date(this.studying_start_date));
    }
}
