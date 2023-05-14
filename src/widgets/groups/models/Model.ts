import { Model } from 'shared/lib/source';

export class GroupModel extends Model {
    public get title() {
        return this.category;
    }
}
